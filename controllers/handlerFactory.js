
const ApiFeature=require('./../utils/apiFeature');
const catchAsync=require('./../utils/catchAsync');
const AppError=require('./../utils/appError');

exports.deleteOne =(model)=>catchAsync(async (req,res,next)=>{

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

exports.createOne=model=>catchAsync(async (req,res,next)=>{
  const doc= await model.create(req.body);
  res.status(201).json({
    status:'success',
    data:doc
  })

})

exports.updateOne=model=>catchAsync(async (req,res,next)=>{
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


exports.getAll= model=> catchAsync(async(req,res,next)=>{
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

exports.getOne=(model, populateOptions)=>catchAsync(async (req,res,next)=>{
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
