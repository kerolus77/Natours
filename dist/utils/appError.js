class AppError extends Error {
    statusCode;
    status;
    isOperational;
    constructor(mesage, statusCode) {
        super(mesage);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
        console.log(this.stack);
    }
}
export default AppError;
//# sourceMappingURL=appError.js.map