const express = require('express');
const toursController=require('../controllers/tourController');
const router=express.Router();
const authController=require('../controllers/authController');


// router.param('id',toursController.checkId);
router.route('/tour-stats').get(toursController.getTourStats);
router.route('/monthly-plan/:year').get(toursController.getMonthlyPlan);
router.route('/top-4-cheap').get(toursController.aliasTopTours, toursController.getAllTours);
router.route('/').get(authController.protect, toursController.getAllTours).post(authController.protect, toursController.createTour);
router.route('/:id').get(toursController.getTour).patch(toursController.updateTour).delete( authController.protect,authController.restrictTo(['admin', 'lead-guide']), toursController.deleteTour);

module.exports=router;