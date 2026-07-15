const express = require('express');
const toursController=require('./../controllers/tourControlle');
const router=express.Router();

// router.param('id',toursController.checkId);
router.route('/tour-stats').get(toursController.getTourStats);
router.route('/monthly-plan/:year').get(toursController.getMonthlyPlan);
router.route('/top-4-cheap').get(toursController.aliasTopTours, toursController.getAllTours);
router.route('/').get(toursController.getAllTours).post( toursController.createTour);
router.route('/:id').get(toursController.getTour).patch(toursController.updateTour).delete(toursController.deleteTour);

module.exports=router;