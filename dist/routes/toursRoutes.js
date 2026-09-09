import express from 'express';
import * as toursController from '../controllers/tourController.js';
import * as authController from '../controllers/authController.js';
import reviewRouter from './reviewsRoutes.js';
const router = express.Router();
router.use('/:tourId/reviews', reviewRouter);
// router.param('id',toursController.checkId);
router.route('/tour-stats').get(toursController.getTourStats);
router.route('/monthly-plan/:year').get(authController.protect, authController.restrictTo('admin', 'lead-guide'), toursController.getMonthlyPlan);
router.route('/top-4-cheap').get(toursController.aliasTopTours, toursController.getAllTours);
router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(toursController.getToursWithin);
router.route('/distances/:latlng/unit/:unit').get(toursController.getDistances);
router.route('/')
    .get(toursController.getAllTours)
    .post(authController.protect, authController.restrictTo('admin', 'lead-guide'), toursController.uploadTourImages, toursController.resizeTourImages, toursController.createTour);
router.route('/:id').get(toursController.getTour)
    .patch(authController.protect, authController.restrictTo("admin", "lead-guide"), toursController.updateTour)
    .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), toursController.deleteTour);
export default router;
//# sourceMappingURL=toursRoutes.js.map