class AppError extends Error {

    constructor(mesage,statusCode){
        super(mesage);
        this.statusCode=statusCode;
        this .status=`${statusCode}`.startsWith('4')?'fail':'error';
        this.isOpritional=true;
       Error.captureStackTrace(this,this.constructor);
       console.log(this.stack);
    }
}

module.exports=AppError;