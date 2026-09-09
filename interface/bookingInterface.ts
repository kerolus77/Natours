import type {Types} from 'mongoose';
export interface IBooking{
    tour:Types.ObjectId;
    startDate:Date;
    user:Types.ObjectId;
    price:number;
    createdAt:Date;
    paid:boolean;
    status:'pending'|'paid'|'expired';
    expiresAt?:Date;
    checkoutSessionId?:string;
}