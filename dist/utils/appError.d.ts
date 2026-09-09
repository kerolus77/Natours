declare class AppError extends Error {
    readonly statusCode: number;
    readonly status: string;
    readonly isOperational: boolean;
    constructor(mesage: string, statusCode: number);
}
export default AppError;
//# sourceMappingURL=appError.d.ts.map