const express=require('express');
const reviewController=require('../controllers/reviewsController');
const authController=require('../controllers/authController');
const routes=express.Router({mergeParams:true});


routes.use(authController.protect);

routes.route('/')
.get(reviewController.getAllReviews)
.post(authController.restrictTo(['user']),reviewController.setTourUserIds, reviewController.createReview)


routes.route('/:id').get(reviewController.getReview)
.delete(authController.restrictTo(['user','admin']),reviewController.deleteReview)
.patch(authController.restrictTo(['user','admin']),reviewController.updateReview);


module.exports=routes;