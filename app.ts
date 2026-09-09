import compression from 'compression';
import cookieParser from 'cookie-parser';
import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { fileURLToPath } from 'node:url';
import path from 'path';
import globalErrorHandler from './controllers/ErrorController.js';
import bookingRouter from './routes/bookingRoutes.js';
import reviewRouter from './routes/reviewsRoutes.js';
import tourRouter from './routes/toursRoutes.js';
import userRouter from './routes/userRoutes.js';
import viewRouter from './routes/viewsRoutes.js';
import AppError from './utils/appError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


console.log(process.env.NODE_ENV);

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
////////////////////global middleware///////////////////////
//Serving static files
 app.use(compression());
 app.use(express.static(path.join(__dirname,'public')));
//Set security HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'script-src': ["'self'", 'https://api.mapbox.com', 'https://js.stripe.com'],
      'style-src': ["'self'", "'unsafe-inline'", 'https://api.mapbox.com', 'https://fonts.googleapis.com'],
      'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
      'img-src': ["'self'", 'data:', 'blob:', 'https://*.mapbox.com'],
      'connect-src': ["'self'", 'https://*.mapbox.com', 'https://api.stripe.com'],
      'frame-src': ["'self'", 'https://js.stripe.com', 'https://checkout.stripe.com'],
      'worker-src': ["'self'", 'blob:'],
      'child-src': ["'self'", 'blob:']
    }
  }
}));

//Development logging
if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'));
}

//cookie parser
app.use(cookieParser());


//Limit requests from same API
const limiter=rateLimit({
  max:100,
  windowMs:60*60*1000,
  message:'Too many requests from this IP, please try again in an hour!'
})
app.use('/api',limiter);


//Body parser, reading data from body into req.body
app.use(express.json({
  limit:'10kb'
}));

//Data sanitization against NoSQL query injection
// app.use(mongoSanitize()); 

//Data sanitization against XSS
// app.use(xss()); 

//Prevent parameter pollution
app.use(hpp({
  whitelist:[
    'duration',
    'ratingsQuantity',
    'ratingsAverage',
    'maxGroupSize',
    'difficulty',
    'price'
  ]
}))




//Routes
app.use('/',viewRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/reviews',reviewRouter);
app.use('/api/v1/bookings',bookingRouter);

app.all("/{any}",(req:Request,res:Response,next:NextFunction)=>{
  next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
})

app.use(globalErrorHandler);
export default app;



///first way of routing
// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);
