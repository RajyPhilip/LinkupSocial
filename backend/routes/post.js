const express = require('express');
const { createPost, likeAndUnlikePost,deletePost } = require('../controllers/post');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();


router.post('/post/upload',isAuthenticated,createPost); 
router.get('/post/:id',isAuthenticated,likeAndUnlikePost); 
router.delete('/post/:id',isAuthenticated,deletePost); 


module.exports = router ;