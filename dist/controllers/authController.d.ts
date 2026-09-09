import type { NextFunction, Request, Response } from 'express';
export declare const signup: (req: Request, res: Response, next: NextFunction) => void;
export declare const login: (req: Request, res: Response, next: NextFunction) => void;
export declare const logout: (req: Request, res: Response, next: NextFunction) => void;
export declare const protect: (req: Request, res: Response, next: NextFunction) => void;
export declare const restrictTo: (...roles: ('user' | 'guide' | 'lead-guide' | 'admin')[]) => (req: Request, res: Response, next: NextFunction) => void;
export declare const isUserLoggedIn: (req: Request, res: Response, next: NextFunction) => void;
export declare const forgetPassword: (req: Request, res: Response, next: NextFunction) => void;
export declare const resetPassword: (req: Request, res: Response, next: NextFunction) => void;
export declare const updatePassword: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authController.d.ts.map