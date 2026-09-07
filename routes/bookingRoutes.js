const express=require('express');
const authController=require('../controllers/authController');
const bookingController=require('../controllers/bookingController');

const routes=express.Router();

routes.use(authController.protect);

routes.get('/checkout-session/:tourId',bookingController.getCheckoutSession);

routes.use(authController.restrictTo('admin','lead-guide'));
routes
  .route('/')
  .get(bookingController.getAllBooking)
  .post(bookingController.createBooking);
  
routes.route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports=routes;