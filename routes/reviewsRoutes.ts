import express from 'express';
import * as authController from '../controllers/authController.js';
import * as reviewController from '../controllers/reviewsController.js';

const routes=express.Router({mergeParams:true});


routes.use(authController.protect);

routes.route('/')
.get(reviewController.getAllReviews)
.post(authController.restrictTo('user'),reviewController.requireBookingTour,
reviewController.setTourUserIds, reviewController.createReview)


routes.route('/:id').get(reviewController.getReview)
.delete(authController.restrictTo('user','admin'),reviewController.restrictReviewOwner,reviewController.deleteReview)
.patch(authController.restrictTo('user','admin'),reviewController.restrictReviewOwner,reviewController.updateReview);



export default routes;