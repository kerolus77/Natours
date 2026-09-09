const express = require('express');
const toursController=require('../controllers/tourController');
const router=express.Router();
const authController=require('../controllers/authController');
const reviewRouter=require('./reviewsRoutes');


router.use('/:tourId/reviews',reviewRouter);


// router.param('id',toursController.checkId);
router.route('/tour-stats').get(toursController.getTourStats);
router.route('/monthly-plan/:year').get(authController.protect,authController.restrictTo('admin','lead-guide'), toursController.getMonthlyPlan);
router.route('/top-4-cheap').get(toursController.aliasTopTours, toursController.getAllTours);

router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(toursController.getToursWithin);
router.route('/distances/:latlng/unit/:unit').get(toursController.getDistances);
router.route('/')
.get(toursController.getAllTours)
.post(authController.protect,
authController.restrictTo('admin','lead-guide'),
toursController.uploadTourImages,
toursController.resizeTourImages,
toursController.createTour);


router.route('/:id').get(toursController.getTour)
.patch(authController.protect,authController.restrictTo(['admin', 'lead-guide']),toursController.updateTour)
.delete( authController.protect,authController.restrictTo(['admin', 'lead-guide']), toursController.deleteTour);

module.exports=router;