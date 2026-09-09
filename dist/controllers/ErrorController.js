import mongoose from 'mongoose';
import AppError from './../utils/appError.js';
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}:${err.value}`;
    return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
    const value = err.keyValue ? Object.values(err.keyValue).join(', ') : 'unknown';
    const message = `Duplicate field value:${value}.Please use another value!`;
    return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data.${errors.join('\n')}`;
    return new AppError(message, 400);
};
const sendErrorDev = (err, req, res) => {
    const isApi = req && req.originalUrl && req.originalUrl.startsWith('/api');
    if (isApi) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }
    else {
        return res.status(err.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: err.message
        });
    }
};
const sendErrorProd = (err, req, res) => {
    const isApi = req && req.originalUrl && req.originalUrl.startsWith('/api');
    if (isApi) {
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }
        else {
            console.error('ERROR', err);
            return res.status(500).json({
                status: 'error',
                message: 'Something went very wrong'
            });
        }
    }
    else {
        if (err.isOperational) {
            return res.status(err.statusCode).render('error', {
                title: 'Something went wrong!',
                msg: err.message
            });
        }
        else {
            return res.status(err.statusCode).render('error', {
                title: 'Something went wrong!',
                msg: 'Please try again later'
            });
        }
    }
};
export default (err, req, res, next) => {
    let error;
    if (err instanceof AppError) {
        error = err;
    }
    else if (err instanceof Error) {
        error = new AppError(err.message, 500);
        error.stack = err.stack || 'Error stack not available';
    }
    else {
        error = new AppError('Something went wrong', 500);
    }
    if (process.env.NODE_ENV === 'development') {
        return sendErrorDev(error, req, res);
    }
    if (process.env.NODE_ENV === 'production') {
        if (err instanceof mongoose.Error.CastError) {
            error = handleCastErrorDB(err);
        }
        if (err instanceof mongoose.Error.ValidationError) {
            error = handleValidationErrorDB(err);
        }
        if (typeof err === 'object' && err !== null && 'code' in err && err.code === 11000) {
            error = handleDuplicateFieldsDB(err);
        }
        return sendErrorProd(error, req, res);
    }
    return res.status(error.statusCode).json({ status: error.status, message: error.message, });
};
//# sourceMappingURL=ErrorController.js.map