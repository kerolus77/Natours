import type { NextFunction, Request, Response } from 'express';
import Booking from '../model/bookingModel.js';
import Tour from '../model/tourModel.js';
import AppError from './../utils/appError.js';
import catchAsync from './../utils/catchAsync.js';



export const getOverview=catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
   //1) get tour data from collection
  const tours=await Tour.find();

   //2) build template

   //3) render that template using tour data from step 1
  res.status(200).render('overview',{
    title:'All tours',
    tours:tours
  })
})

export const getTour=catchAsync(async (req:Request,res:Response,next:NextFunction  )=>{
  //1) get the data for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug||"" }).populate({
    path:'reviews',
    select:'review rating user'
   });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  res.status(200).render('tour',{
    title: tour.name,
    tour: tour
  })
})

export const getMyTours=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
const bookings=await Booking.find({user:req.user.id});
const tourIDs=bookings.map(el=>el.tour);
const tours=await Tour.find({_id:{$in:tourIDs}});

res.status(200).render('overview',{
  title:'My Tours',
  tours
})
})



export const getLoginForm=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  // const{email,password}=req.body;

  res.status(200).render('login',{
    title:'Log into your account'
  })
})

export const getAccount=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  res.status(200).render('account',{
    title:'Your account'
  })
})