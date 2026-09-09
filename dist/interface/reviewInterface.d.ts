import type { Types } from 'mongoose';
export interface IReview {
    review: string;
    rating: number;
    createdAt: Date;
    tour: Types.ObjectId;
    user: Types.ObjectId;
}
//# sourceMappingURL=reviewInterface.d.ts.map