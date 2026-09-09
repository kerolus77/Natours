import mongoose, {Query} from 'mongoose';
import type { IBooking } from '../interface/bookingInterface.js';

const bookingSchema=new mongoose.Schema<IBooking>({
    tour:{
        type:mongoose.Schema.ObjectId,
        ref:'Tour',
        required:[true,'Booking must belong to a tour!']
    },
    startDate:{
        type:Date,
        required:[true,'Booking must have a start date!']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'Booking must belong to a user!']
    },
    price:{
        type:Number,
        required:[true,'Booking must have a price!']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    paid:{
        type:Boolean,
        default:true
    },
    status:{
        type:String,
        enum:['pending','paid','expired'],
        default:'paid'
    },
    expiresAt:Date,
    checkoutSessionId:String
},{
    timestamps:false
})

bookingSchema.index(
    {tour:1,user:1,startDate:1},
    {unique:true,partialFilterExpression:{status:'pending'}}
);

bookingSchema.pre(/^find/,function(this:Query<any, any> ){
    this.populate('user').populate({
        path: 'tour',
        select: 'name'
    });
   
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;