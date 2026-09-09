import type { Types } from 'mongoose';
export interface ITour {
    id: string;
    slug: string;
    name: string;
    duration: number;
    maxGroupSize: number;
    difficulty: string;
    ratingsAverage: number;
    ratingsQuantity: number;
    price: number;
    priceDiscount?: number;
    summary: string;
    description: string;
    imageCover: string;
    images: string[];
    createdAt: Date;
    startDates: dateModel[];
    secretTour: boolean;
    startLocation: startLocationModel;
    locations: startLocationModel[];
    guides: Types.ObjectId[];
}
type dateModel = {
    startDate: Date;
    participants: number;
    soldOut: boolean;
};
type startLocationModel = {
    type: ['Point'];
    coordinates: number[];
    address: string;
    description: string;
};
export {};
//# sourceMappingURL=tourInterface.d.ts.map