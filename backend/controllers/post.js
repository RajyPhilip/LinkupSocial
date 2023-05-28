const Post = require('../models/Post');
const User = require('../models/User');
const cloudinary = require('cloudinary');

//CREATE POST
exports.createPost = async (req,res)=>{
    try {
        //cloudinary uploadthen will put in the public id and url ;
        const myCloud = await cloudinary.v2.uploader.upload(req.body.image ,{
            folder:'linkup_posts'
        });
        const newPostData = {
            caption:req.body.caption,
            image:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            },
            owner:req.user._id
        }
        const newPost = await Post.create(newPostData);
        
        // now putting the new post id in users posts array
        const user = await User.findById(req.user._id);
        user.posts.unshift(newPost._id);
        await user.save();
        

        res.status(201).json({
            success:true,
            post:newPost,
            message:"Post created"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//DELETE POST 
exports.deletePost = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found"
            });
        }
        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success:false,
                message:"Unauthorised"
            })
        }
        await cloudinary.v2.uploader.destroy(post.image.public_id);
        await post.deleteOne() ;
        const user = await User.findById(req.user._id);
        const index = user.posts.indexOf(req.params.id);
        user.posts.splice(index,1);
        await user.save();
        res.status(200).json({
            success:true,
            message:"Post deleted"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//LIKE UNLIKE POST
exports.likeAndUnlikePost = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found"
            });
        }
        if(post.likes.includes(req.user._id)){
            const index = post.likes.indexOf(req.user._id);
            post.likes.splice(index,1);
            await post.save();
            return res.status(200).json({
                success:true,
                message:"Post Unliked"
            });
        }else{
            post.likes.push(req.user._id);
            await post.save();
            return res.status(200).json({
                success:true,
                message:"Post Liked"
            });
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//GET ALL THE POST OF THE USERS THE CURRENT USER IS FOLLOWING 
exports.getPostOfFollowing = async (req,res)=>{
    try {
        const user =  await User.findById(req.user._id);
        const posts = await Post.find({
            owner:{
                $in:user.following,
            }
        }).populate('owner likes comments.user') ;

        res.status(200).json({
            success:true,
            posts:posts.reverse(),
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//UPDATING POST CAPTIONS
exports.updateCaption = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found"
            });
        }
        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            });
        }
        post.caption = req.body.caption ; 
        await post.save();
        res.status(200).json({
            success:true,
            message:"Post updated"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
//COMMENT AND UPDATE ON A POST
exports.commentOnPost = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found"
            });
        }
        //checking if comment already exists
        let commentIndex = -1 ;
        post.comments.forEach((item,index)=>{
            if(item.user.toString() === req.user._id.toString()){
                commentIndex = index ;
            }
        });

        if(commentIndex !== -1){
            post.comments[commentIndex].comment = req.body.comment ;
            await post.save();
            return res.status(200).json({
                success:true,
                message:"Comment Updated"
            });
        }else{
            post.comments.push({
                user:req.user._id,
                comment:req.body.comment
            })
            await post.save();
            return res.status(200).json({
                success:true,
                message:"Comment added"
            });
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
//DELETE COMMENT 
exports.deleteComment = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found"
            });
        }
        //checking if post owner wants to delete
        if(post.owner.toString() === req.user._id.toString()){

            if(req.body.commentID == undefined){
                return res.status(400).json({
                    success:false,
                    message:"CommentID is  required"
                });
            }
            post.comments.forEach((item,index)=>{
                if(item._id.toString() === req.body.commentID.toString()){
                    return post.comments.splice(index,1);
                }
            });
            await post.save();
            res.status(200).json({
                success:true,
                message:"Selected Comment has deleted"
            });
        }else{
            post.comments.forEach((item,index)=>{
                if(item.user.toString() === req.user._id.toString()){
                    return post.comments.splice(index,1);
                }
            });
            await post.save();
            return res.status(200).json({
                success:true,
                message:"Your comment has deleted"
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}