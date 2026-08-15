const Tour= require('../model/tourModel');
const ApiFeature=require('./../utils/apiFeature');
const catchAsync=require('./../utils/catchAsync');
const AppError=require('./../utils/appError');

exports.aliasTopTours=(req,res,next)=>{
  req.query.limit='5';
  req.query.sort='-ratingsAverage,price';
  req.query.fields='name,price,ratingsAverage,summary,difficulty';
  next();
}

exports.getAllTours= catchAsync(async(req,res,next)=>{
  const feature=new ApiFeature(Tour.find(),req.query)
  .filter()
  .sort()
  .filedLimiting()
  .pagination();
  const tours=await feature.query;
  
    res.status(200).json(
      {
        message:'success',
        data:tours
      }
    );
})

exports.getTour=catchAsync(async (req,res,next)=>{
    const id =req.params.id;
   const tour=await Tour.findById(id);
  //Tour.findOne({_id:id})
  if(!tour){
    return next(new AppError('No tour found with that ID',404));
  }
      res.status(200).json(
        {
          message:'success',
          data:tour
        }
      );
})

exports.createTour=catchAsync(async (req,res,next)=>{
  const newTour= await Tour.create(req.body);
  res.status(201).json({
    status:'success',
    data:{
      tour:newTour
    }
  })

})

exports.updateTour=catchAsync(async (req,res,next)=>{
    const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true
    })
      if(!tour){
    return next(new AppError('No tour found with that ID',404));
  }
    res.status(200).json({
      status:'success',

      data:{
        tour:tour
      }
    })
 
}
)

exports.deleteTour=catchAsync(async (req,res,next)=>{

  const tour= await Tour.findByIdAndDelete(req.params.id);
  if(!tour){
    return next(new AppError('No tour found with that ID',404));
  }
    res.status(204).json({
      status:'success',
      data:null
    })
  }
)

exports.getTourStats=catchAsync( async(req,res,next)=>{

    const stats=await Tour.aggregate([
    {$match:{ratingsAverage:{$gte:4.5}}},
    {$group:{
      _id:'$difficulty',
      numTours:{$sum:1},
      numRatings:{$sum:'$ratingsQuantity'},
      avgRating:{$avg:'$ratingsAverage'},
      avgPrice:{$avg:'$price'},
      minPrice:{$min:'$price'},
      maxPrice:{$max:'$price'}
    }},
    {$sort:{avgPrice:1}}
   
  ]);
  res.status(200).json({
    status:'success',
    data:stats
  })
  
}
)

exports.getMonthlyPlan=catchAsync(async(req,res,next)=>{

    const year=req.params.year*1;
    const plan =await Tour.aggregate([
      {$unwind:'$startDates'},
      {$match:{
        startDates:{
          $gte:new Date(`${year}-01-01`),
          $lte:new Date(`${year}-12-31`)
        }
      }},
      {$group:{
        _id:{$month:'$startDates'},
        numTourStarts:{$sum:1},
        tour:{$push:'$name'}
      }},
      {$addFields:{month:'$_id'}},
      {$sort:{numTourStarts:-1}},
      {$project:{
        _id:0
      }}
    ])
     res.status(200).json({
      status:'success',
      data:plan
    })

})