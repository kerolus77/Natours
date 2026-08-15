const express = require('express');
const usersController=require('./../controllers/userController');
const authController=require('./../controllers/authController');

const router=express.Router();

router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.post('/forget-password',authController.forgetPassword);
router.patch('/reset-password/:token',authController.resetPassword);
router.patch('/update-password',authController.protect,authController.updatePassword);
router.patch('/update-me',authController.protect,usersController.updateMe);
router.delete('/delete-account',authController.protect,usersController.deleteMyAccount);

router.route('/').get(usersController.getAllUsers).post(usersController.createUser);
router.route('/:id').get(usersController.getUser).patch(usersController.updateUser).delete(usersController.deleteUser);

module.exports=router;