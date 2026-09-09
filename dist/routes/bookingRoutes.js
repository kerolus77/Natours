import express from 'express';
import * as bookingController from '../controllers/bookingController.js';
import * as authController from '../controllers/authController.js';
const routes = express.Router();
routes.use(authController.protect);
routes.get('/checkout-session/:tourId', bookingController.getCheckoutSession);
routes.use(authController.restrictTo('admin', 'lead-guide'));
routes
    .route('/')
    .get(bookingController.getAllBooking)
    .post(bookingController.createBooking);
routes.route('/:id')
    .get(bookingController.getBooking)
    .patch(bookingController.updateBooking)
    .delete(bookingController.deleteBooking);
export default routes;
//# sourceMappingURL=bookingRoutes.js.map