const express = require('express');
const usersController=require('./../controllers/userController');
const authController=require('./../controllers/authController');

const router=express.Router();

router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.get('/logout',authController.logout);
router.post('/forget-password',authController.forgetPassword);
router.patch('/reset-password/:token',authController.resetPassword);

router.use(authController.protect);
router.patch('/update-password',authController.updatePassword);
router.patch('/update-me', usersController.uploadUserPhoto, usersController.resizeImage, usersController.updateMe);
router.delete('/delete-account',usersController.deleteMyAccount);
router.get('/me',usersController.getMe,usersController.getUser );

router.use(authController.restrictTo('admin'));
router.route('/')
.get(usersController.getAllUsers)
.post(usersController.createUser);
router.route('/:id')
.get(usersController.getUser)
.patch(usersController.updateUser)
.delete(usersController.deleteUser);

module.exports=router;