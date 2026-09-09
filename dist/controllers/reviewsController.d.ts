import type { Request, Response, NextFunction } from 'express';
export declare const setTourUserIds: (req: Request, res: Response, next: NextFunction) => void;
export declare const requireBookingTour: (req: Request, res: Response, next: NextFunction) => void;
export declare const restrictReviewOwner: (req: Request, res: Response, next: NextFunction) => void;
export declare const getAllReviews: (req: Request, res: Response, next: NextFunction) => void;
export declare const getReview: (req: Request, res: Response, next: NextFunction) => void;
export declare const createReview: (req: Request, res: Response, next: NextFunction) => void;
export declare const updateReview: (req: Request, res: Response, next: NextFunction) => void;
export declare const deleteReview: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=reviewsController.d.ts.map