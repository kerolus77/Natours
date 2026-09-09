import type { Request, Response, NextFunction } from 'express';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import * as factory from './handlerFactory.js';
import User from './../model/userModel.js';
import multer from 'multer';
import sharp from 'sharp';




// const multerStorage=multer.diskStorage({
//   destination:(req,file,cd)=>{
//     cd(null,'public/img/users')
//   },
//   filename:(req,file,cd)=>{
//     const ext=file.mimetype.split('/')[1];
//     cd(null,`user-${req.user.id}-${Date.now()}.${ext}`)
//   }
// })
 
const multerStorage=multer.memoryStorage()



const multerFilter=(req:Request,file:Express.Multer.File,cd:Function)=>{
  if(file.mimetype.startsWith('image')){
    cd(null,true);
  }else{
    cd(new AppError('Not an image! Please upload only images.',400),false);
  }
}

const upload=multer({
  storage:multerStorage,
  fileFilter:multerFilter
})

export  const resizeImage=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  if(!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
})
export  const uploadUserPhoto=upload.single('photo');



const filterObj=(obj:{[key: string]: any},...allowedFields:string[])=>{
  const newObj:{[key: string]: any}={};
   Object.keys(obj).forEach(el=>{
    if(allowedFields.includes(el)) newObj[el]=obj[el];
  })
  return newObj;
}
export const createUser=(req:Request,res:Response,next:NextFunction)=>{
  res.status(500).json({
    status:'error',
    message:'This route is not yet defined'
  })
}
export  const getUser=factory.getOne(User);
export  const updateUser=factory.updateOne(User);
export  const getAllUsers=factory.getAll(User);
export  const deleteUser=factory.deleteOne(User);

export const getMe=(req:Request,res:Response,next:NextFunction)=>{
  req.params.id=req.user.id;
  next();
}

export  const updateMe= catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  //1) Create error if user POSTs password data
  if (req.body.password||req.body.passwordConfirm){
    return next(new AppError('This route is not for password updates. Please use /update-password',400));
  }

  //2) filtered out unwanted fields names that are not allowed to be updated
  const filteredBody= filterObj(req.body,'name','email');

  if (req.file) {
    filteredBody.photo = req.file.filename;
  }

  //3) Update user document
  const updatedUser= await User.findByIdAndUpdate(req.user.id,filteredBody,{
    new:true,
    runValidators:true
  })
  res.status(200).json({
    status:'success',
    data:{
      user:updatedUser
    }
  })
})
export const deleteMyAccount= catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  await User.findByIdAndUpdate(req.user.id,{active:false});
  res.status(204).json({
    status:'success',
    data:null
  })
})
