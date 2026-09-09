

class AppError extends Error {

    readonly statusCode:number;
    readonly status:string;
    readonly isOperational:boolean;

    constructor(mesage:string,statusCode:number){
        super(mesage);
        this.statusCode=statusCode;
        this .status=`${statusCode}`.startsWith('4')?'fail':'error';
        this.isOperational=true;
       Error.captureStackTrace(this,this.constructor);
       console.log(this.stack);
       
    }
}

export default AppError;