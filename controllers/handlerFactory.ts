
import type { Request, Response, NextFunction } from 'express';
import type { Model } from 'mongoose';
import ApiFeature from './../utils/apiFeature.js';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';



export const deleteOne =<T>(model:Model<T>)=>catchAsync(async (req:Request,res:Response,next:NextFunction)=>{

  const doc= await model.findByIdAndDelete(req.params.id);
  if(!doc){
    return next(new AppError('No item found with that ID',404));
  }
    res.status(204).json({
      status:'success',
      data:null
    })
  }
)

export const createOne=<T>(model:Model<T>)=>catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
  const doc= await model.create(req.body);
  res.status(201).json({
    status:'success',
    data:doc
  })

})

export const updateOne=<T>(model:Model<T>)=>catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
    const doc=await model.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true
    })
      if(!doc){
    return next(new AppError('No item found with that ID',404));
  }
    res.status(200).json({
      status:'success',

      data:doc
      
    })
 
}
)




export const getAll= <T>(model:Model<T>)=> catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
      let filter={};
      if(req.params.tourId) filter={tour:req.params.tourId};
  const feature=new ApiFeature(model.find(filter),req.query)
  .filter()
  .sort()
  .filedLimiting()
  .pagination();
  const doc=await feature.query;
  
    res.status(200).json(
      {
        message:'success',
        data:doc
      }
    );
})

export const  getOne=<T>(model:Model<T>, populateOptions?:any)=>catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
    const id =req.params.id;
    const query=model.findById(id);
    if(populateOptions) query.populate(populateOptions);
    const doc=await query;
  //Tour.findOne({_id:id})
  if(!doc){
    return next(new AppError('No item found with that ID',404));
  }
      res.status(200).json(
        {
          message:'success',
          data:doc
        }
      );
})
