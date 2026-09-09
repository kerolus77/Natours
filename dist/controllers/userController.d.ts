import type { Request, Response, NextFunction } from 'express';
export declare const resizeImage: (req: Request, res: Response, next: NextFunction) => void;
export declare const uploadUserPhoto: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const createUser: (req: Request, res: Response, next: NextFunction) => void;
export declare const getUser: (req: Request, res: Response, next: NextFunction) => void;
export declare const updateUser: (req: Request, res: Response, next: NextFunction) => void;
export declare const getAllUsers: (req: Request, res: Response, next: NextFunction) => void;
export declare const deleteUser: (req: Request, res: Response, next: NextFunction) => void;
export declare const getMe: (req: Request, res: Response, next: NextFunction) => void;
export declare const updateMe: (req: Request, res: Response, next: NextFunction) => void;
export declare const deleteMyAccount: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=userController.d.ts.map