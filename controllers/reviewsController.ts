import type {Request,Response,NextFunction} from 'express';
import Booking from '../model/bookingModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import Review from './../model/reviewModel.js';
import { deleteOne, createOne, updateOne, getAll, getOne } from './handlerFactory.js';





export const setTourUserIds=(req:Request,res:Response,next:NextFunction)=>{
    //Allow nested routes
    if(!req.body.tour) req.body.tour=req.params.tourId;
    if(!req.body.user) req.body.user=req.user.id;
    next();
}
export const requireBookingTour= catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const booking= await Booking.findOne({tour:req.body.tour,user:req.user.id});
    if(!booking) return next(new AppError('You can only review tours you booked',403));
    next();
})

export const restrictReviewOwner=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const review=await Review.findById(req.params.id);

    if(!review) return next(new AppError('No review found with that ID',404));
    if(req.user.role!=='admin' || review.user.toString()!==req.user.id)
        { return next(new AppError('You do not have permission to perform this action',403));}

    if(req.user.role!=='admin'){
        delete req.body.user;
        delete req.body.tour;
    }
    next();
}
)
export const getAllReviews=getAll(Review);

export const getReview=getOne(Review);

export const createReview=createOne(Review);

export const updateReview=updateOne(Review);

export const deleteReview=deleteOne(Review);