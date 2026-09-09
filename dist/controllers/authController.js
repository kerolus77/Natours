import crypto from 'crypto';
import JWT from 'jsonwebtoken';
import { parseParam } from '../utils/helperMethods.js';
import { promisify } from 'util';
import User from './../model/userModel.js';
import AppError from './../utils/appError.js';
import catchAsync from './../utils/catchAsync.js';
import Email from './../utils/mail.js';
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('JWT_SECRET is missing from config.env');
}
const jwtExpiresIn = (process.env.JWT_EXPIRES_IN ?? '90d');
const cookieExpiresIn = Number(process.env.JWT_COOKIE_EXPIRES_IN ?? 90);
const signinToken = (id) => {
    return JWT.sign({ id }, jwtSecret, { expiresIn: jwtExpiresIn });
};
const createSendToken = (user, statusCode, res) => {
    const cookieOptions = {
        expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production')
        cookieOptions.secure = true;
    const token = signinToken(user.id);
    res.cookie('jwt', token, cookieOptions);
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};
const verifyToken = (token) => new Promise((resolve, reject) => {
    JWT.verify(token, jwtSecret, (error, decoded) => {
        if (error) {
            reject(error);
        }
        else if (!decoded || typeof decoded === 'string') {
            reject(new Error('Invalid token payload'));
        }
        else {
            resolve(decoded);
        }
    });
});
export const signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    const url = `${req.protocol}://${req.get('host')}/me`;
    await new Email(newUser, url).sendWelcome();
    const token = signinToken(newUser.id);
    createSendToken(newUser, 201, res);
});
export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }
    const token = signinToken(user.id);
    createSendToken(user, 200, res);
});
export const logout = (req, res, next) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};
export const protect = catchAsync(async (req, res, next) => {
    //1) Getting token and check if it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access', 401));
    }
    //2) Verification token
    const decoded = await verifyToken(token);
    //3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist', 401));
    }
    //4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(Number(decoded.iat))) {
        return next(new AppError('User recently changed password! Please log in again', 401));
    }
    //  Grant access to protected route
    req.user = currentUser;
    res.locals.currentUser = currentUser;
    next();
});
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};
export const isUserLoggedIn = catchAsync(async (req, res, next) => {
    //1) Getting token and check if it's there
    if (req.cookies.jwt) {
        //2) Verification token
        const decoded = await verifyToken(req.cookies.jwt);
        //3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return next();
        }
        //4) Check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(Number(decoded.iat))) {
            return next();
        }
        //  Grant access to protected route
        res.locals.currentUser = currentUser;
        return next();
    }
    return next();
});
export const forgetPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user with email address', 404));
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    // 3) Send it to user's email
    try {
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`;
        await new Email(user, resetURL).sendPasswordReset();
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        });
    }
    catch (err) {
        console.log(err);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError('There was an error sending the email. Try again later!', 500));
    }
});
export const resetPassword = catchAsync(async (req, res, next) => {
    const token = parseParam(req.params.token);
    if (!token) {
        return next(new AppError('Reset token is required', 400));
    }
    //1) Get user based on the token
    const hashedToken = crypto.createHash(`sha256`).update(token).digest('hex');
    console.log(hashedToken);
    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
    //2) If token has not expired, and there is user, set the new password
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    //3) Update changedPasswordAt property for the user
    // done in userModel.js as pre save middleware
    //4) Log the user in, send JWT
    createSendToken(user, 200, res);
});
export const updatePassword = catchAsync(async (req, res, next) => {
    //1) Get user from collection
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
        return next(new AppError('User no longer exists', 401));
    }
    //2) Check if POSTed current password is correct
    if (!await user.correctPassword(req.body.passwordCurrent, user.password)) {
        return next(new AppError('Your current password is wrong', 401));
    }
    //3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    //4) Log user in, send JWT
    createSendToken(user, 200, res);
});
//# sourceMappingURL=authController.js.map