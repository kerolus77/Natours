const express = require('express');
const morgan=require('morgan');
const tourRouter=require('./routes/toursRoutes');
const userRouter=require('./routes/userRoutes');


const app = express();

app.use(express.json());
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'));
}




 app.use('/api/v1/users',userRouter);

app.use('/api/v1/tours',tourRouter);
 app.use(express.static(`${__dirname}/public`));

module.exports=app;



///first way of routing
// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);
