const express = require('express');
const userController = require('../controllers/user');
const {isAuthenticated} = require('../middlewares/auth');

const router = express.Router();


router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/logout',userController.logout);
router.get('/follow/:id',isAuthenticated,userController.followUser);





module.exports = router ; 