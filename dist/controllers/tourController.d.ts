import type { Request, Response, NextFunction } from 'express';
export declare const resizeTourImages: (req: Request, res: Response, next: NextFunction) => void;
export declare const uploadTourImages: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const aliasTopTours: (req: Request, res: Response, next: NextFunction) => void;
export declare const getAllTours: (req: Request, res: Response, next: NextFunction) => void;
export declare const getTour: (req: Request, res: Response, next: NextFunction) => void;
export declare const createTour: (req: Request, res: Response, next: NextFunction) => void;
export declare const updateTour: (req: Request, res: Response, next: NextFunction) => void;
export declare const deleteTour: (req: Request, res: Response, next: NextFunction) => void;
export declare const getToursWithin: (req: Request, res: Response, next: NextFunction) => void;
export declare const getDistances: (req: Request, res: Response, next: NextFunction) => void;
export declare const getTourStats: (req: Request, res: Response, next: NextFunction) => void;
export declare const getMonthlyPlan: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=tourController.d.ts.map