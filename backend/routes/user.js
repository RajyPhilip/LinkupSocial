const express = require('express');
const userController = require('../controllers/user');
const {isAuthenticated} = require('../middlewares/auth');

const router = express.Router();


router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/logout',userController.logout);
router.get('/follow/:id',isAuthenticated,userController.followUser);
router.put('/update/password',isAuthenticated,userController.updatePassword);
router.put('/update/profile',isAuthenticated,userController.updateProfile);
router.delete('/delete/me',isAuthenticated,userController.deleteProfile);
router.get('/me',isAuthenticated,userController.myProfile);
router.get('/user/:id',isAuthenticated,userController.getUserProfile);
router.get('/users',isAuthenticated,userController.getAllUsers);








module.exports = router ; 