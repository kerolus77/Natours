import type { Request, Response, NextFunction } from 'express';
import type { Model } from 'mongoose';
export declare const deleteOne: <T>(model: Model<T>) => (req: Request, res: Response, next: NextFunction) => void;
export declare const createOne: <T>(model: Model<T>) => (req: Request, res: Response, next: NextFunction) => void;
export declare const updateOne: <T>(model: Model<T>) => (req: Request, res: Response, next: NextFunction) => void;
export declare const getAll: <T>(model: Model<T>) => (req: Request, res: Response, next: NextFunction) => void;
export declare const getOne: <T>(model: Model<T>, populateOptions?: any) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=handlerFactory.d.ts.map