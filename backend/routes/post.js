const express = require('express');
const postController = require('../controllers/post');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();


router.post('/post/upload',isAuthenticated,postController.createPost); 
router.get('/post/:id',isAuthenticated,postController.likeAndUnlikePost); 
router.delete('/post/:id',isAuthenticated,postController.deletePost);  
router.get('/posts',isAuthenticated,postController.getPostOfFollowing); 


module.exports = router ;