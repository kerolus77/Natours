import express from 'express';
import * as viewsController from './../controllers/viewsController.js';
import * as authController from './../controllers/authController.js';
import * as bookingController from './../controllers/bookingController.js';
const router = express.Router();
router.get('/', bookingController.createBookingCheckout, authController.isUserLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.isUserLoggedIn, viewsController.getTour);
router.get('/login', authController.isUserLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);
export default router;
//# sourceMappingURL=viewsRoutes.js.map