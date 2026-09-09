
const catchAsync =require('./../utils/catchAsync');
const User =require('./../model/userModel');
const JWT=require('jsonwebtoken');
const {promisify}= require('util');
const AppError=require('./../utils/appError');
const Email=require('./../utils/mail');
const crypto=require('crypto');


const signinToken= id=>JWT.sign({id:id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_IN
});
const createSendToken=(user,statusCode,res)=>{
    const cookieOptions={
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly:true
    }
    if(process.env.NODE_ENV==='production') cookieOptions.secure=true;
   
    
    const token=signinToken(user._id);

    res.cookie('jwt',token,cookieOptions);
    res.status(statusCode).json({
        status:'success',
        token,
        data:{
            user
        }
      
    })
}

exports.signup= catchAsync(async(req,res,next)=>{
const newUser= await User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    passwordConfirm:req.body.passwordConfirm
})
const url=`${req.protocol}://${req.get('host')}/me`;
await new Email(newUser,url).sendWelcome();
const token=signinToken(newUser._id);
createSendToken(newUser,201,res);
    })


 exports.login=catchAsync(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new AppError('Please provide email and password',400));
    }
    const user=await User.findOne({email}).select('+password');
    if(!user || !(await user.correctPassword(password,user.password))){
        return next(new AppError('Incorrect email or password',401));
    }
    const token=signinToken(user._id);
    createSendToken(user,200,res);

 })

 exports.logout=(req,res)=>{
    res.cookie('jwt','loggedout',{
        expires:new Date(Date.now() + 10*1000),
        httpOnly:true
    });

    res.status(200).json({ status:'success' });
 };

 exports.protect=catchAsync(async(req,res,next)=>{
    //1) Getting token and check if it's there
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    }else if(req.cookies.jwt){
        token=req.cookies.jwt;
    }
    if(!token){
        return next(new AppError('You are not logged in! Please log in to get access',401));
    }
//2) Verification token

const decoded = await promisify(JWT.verify)(token,process.env.JWT_SECRET);
//3) Check if user still exists
const currentUser= await User.findById(decoded.id);
if(!currentUser){
    return next(new AppError('The user belonging to this token does no longer exist',401));
}

//4) Check if user changed password after the token was issued
if (currentUser.changedPasswordAfter(decoded.iat)){
    return next(new AppError('User recently changed password! Please log in again',401));
}

//  Grant access to protected route
req.user=currentUser;
res.locals.currentUser=currentUser;

    next();
 })

 exports.restrictTo=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have permission to perform this action',403));
        }
        next();
    }
 }

 exports.isUserLoggedIn=catchAsync(async(req,res,next)=>{
    //1) Getting token and check if it's there
    if(req.cookies.jwt){
    
   
    
//2) Verification token

const decoded = await promisify(JWT.verify)(req.cookies.jwt,process.env.JWT_SECRET);
//3) Check if user still exists
const currentUser= await User.findById(decoded.id);
if(!currentUser){
    return next();
}

//4) Check if user changed password after the token was issued
if (currentUser.changedPasswordAfter(decoded.iat)){
    return next();
}

//  Grant access to protected route
res.locals.currentUser=currentUser;
   return next();
 }
 return next();
})



 exports.forgetPassword=catchAsync(async(req,res,next)=>{
      user= await User.findOne({email:req.body.email});
      if (!user){
        return next(new AppError('There is no user with email address',404))
      }
    const resetToken=user.createPasswordResetToken();
    await user.save({validateBeforeSave:false});

    // 3) Send it to user's email


    try{
     const resetURL=`${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`;

        await new Email(user,resetURl).sendPasswordReset();

        res.status(200).json({
            status:'success',
            message:'Token sent to email!'
        });
    } catch(err){
        console.log(err);
        user.passwordResetToken=undefined;
        user.passwordResetExpires=undefined;
        await user.save({validateBeforeSave:false});
        return next(new AppError('There was an error sending the email. Try again later!'),500);
    }
    
 })


 exports.resetPassword=catchAsync(async(req,res,next)=>{

  //1) Get user based on the token
    const hashedToken=crypto.createHash(`sha256`).update(req.params.token).digest('hex');
    console.log(hashedToken);
    const user= await User.findOne({passwordResetToken:hashedToken,passwordResetExpires:{$gt:Date.now()}});
    //2) If token has not expired, and there is user, set the new password
    if(!user){
        return next(new AppError('Token is invalid or has expired',400));
    }
    user.password=req.body.password;
    user.passwordConfirm=req.body.passwordConfirm;
    user.passwordResetToken=undefined;
    user.passwordResetExpires=undefined;
    await user.save();
    //3) Update changedPasswordAt property for the user
    // done in userModel.js as pre save middleware
    //4) Log the user in, send JWT
    createSendToken(user,200,res);

 })

 exports.updatePassword=catchAsync(async(req,res,next)=>{
    //1) Get user from collection
    const user= await User.findById(req.user.id).select('+password');

    //2) Check if POSTed current password is correct
    if(! await user.correctPassword(req.body.passwordCurrent,user.password)){
        return next(new AppError('Your current password is wrong',401));
    }

    //3) If so, update password
    user.password=req.body.password;
    user.passwordConfirm=req.body.passwordConfirm;
    await user.save();
    
    //4) Log user in, send JWT
    createSendToken(user,200,res);

 })