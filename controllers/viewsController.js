const catchAsync=require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const Tour= require('../model/tourModel');
const Booking=require('../model/bookingModel');

exports.getOverview=catchAsync(async (req,res,next)=>{
   //1) get tour data from collection
  const tours=await Tour.find();

   //2) build template

   //3) render that template using tour data from step 1
  res.status(200).render('overview',{
    title:'All tours',
    tours:tours
  })
})

exports.getTour=catchAsync(async (req,res,next)=>{
  //1) get the data for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path:'reviews',
    fields:'review rating user'
   });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  res.status(200).render('tour',{
    title: tour.name,
    tour: tour
  })
})

exports.getMyTours=catchAsync(async(req,res,next)=>{
const bookings=await Booking.find({user:req.user.id});
const tourIDs=bookings.map(el=>el.tour);
const tours=await Tour.find({_id:{$in:tourIDs}});

res.status(200).render('overview',{
  title:'My Tours',
  tours
})
})


exports.getLoginForm=catchAsync(async(req,res,next)=>{
  // const{email,password}=req.body;

  res.status(200).render('login',{
    title:'Log into your account'
  })
})

exports.getAccount=catchAsync(async(req,res,next)=>{
  res.status(200).render('account',{
    title:'Your account'
  })
})