const Post = require('../models/Post');
const User = require('../models/User');
const cloudinary = require('cloudinary');

//REGISTER
exports.register = async(req,res)=>{
    try {

        const {name,email,password,avatar} = req.body ;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        const myCloud = await cloudinary.v2.uploader.upload(avatar,{
            folder:'linkup_avatars'
        })
        user = await User.create({
            name,email,password,
            avatar:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url 
            }
        })
        const token = await user.generateToken();
        const options = {
            expires:new Date(Date.now()+ 90 * 24 * 60 * 60 * 1000),
            httpOnly:true,
        }
        return res.status(201)
        .cookie("token", token,options)
        .json({
            success:true,
            message:"user registered succesfully",
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        }) ;
    }
}

//LOGIN 
module.exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email: email }).select('+password').populate('posts followers following') ;
        if(!user) return res.status(400).json({
                success:false,
                message: 'User not found'
            });
            const isMatched = await user.matchPassword(password);

        if(!isMatched) return res.status(403).json({
                message: 'Invalid Password or Email'
            });
        const token = await user.generateToken();
        const options = {
            expires:new Date(Date.now()+ 90 * 24 * 60 * 60 * 1000),
            httpOnly:true,
        }
        return res.status(200)
        .cookie("token", token,options)
        .json({
            success:true,
            user,
            token
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}; 

//LOGOUT 
exports.logout = async (req,res)=>{
    try {
        res.status(200).cookie('token',null,{expires:new Date(Date.now()),httpOnly:true}).json({
            success:true,
            message:"Logged out Succesfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//Follow another user
exports.followUser = async (req,res)=>{
    try {
        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user._id);

        if(!userToFollow){
            req.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        if(loggedInUser.following.includes(userToFollow._id)){

            const indexfollowing = loggedInUser.following.indexOf(userToFollow)
            const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);

            loggedInUser.following.splice(indexfollowing,1);
            userToFollow.followers.splice(indexfollowers,1);

            await loggedInUser.save();
            await userToFollow.save()
            return res.status(200).json({
                success:true,
                message:"User Unfollowed"
            });
        }else{
            loggedInUser.following.push(userToFollow._id);
            userToFollow.followers.push(loggedInUser._id);
            await userToFollow.save();
            await loggedInUser.save();
            return res.status(200).json({
                success:true,
                message:"User Followed"
            });
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// UPDATE PASSWORD 
exports.updatePassword = async (req,res)=>{
    try {
        const {oldPassword,newPassword} = req.body ;
        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success:false,
                message:"Please provide old and new password"
            })
        }
        const user = await User.findById(req.user._id).select('+password');
        const isMatched = await user.matchPassword(oldPassword);
        if(!isMatched){
            return res.status(400).json({
                success:false,
                message:"Incorrect Old password"
            });
        }
        user.password = newPassword ; 
        await user.save();
        res.status(200).json({
            success:true,
            message:"Password Updated"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// UPDATE PROFILE
exports.updateProfile = async (req,res)=>{
    try {
        const {name,email,avatar} = req.body ;
        const user = await User.findById(req.user._id);
        if(name){
            user.name=name
        }
        if(email){
            user.email=email
        }
        if(avatar){
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            const myCloud = await cloudinary.v2.uploader.upload(avatar,{
                folder:'linkup_avatars'
            })
            user.avatar.public_id = myCloud.public_id ;
            user.avatar.url = myCloud.secure_url ;
        }
        await user.save();
        res.status(200).json({
            success:true,
            message:"Profile Updated"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
//DELETE PROFILE
exports.deleteProfile = async (req,res)=>{
    try {
        const user  = await User.findById(req.user._id);
        const posts = user.posts ;
        const followers = user.followers ;
        const following = user.following
        const userID = user._id

        //removing avatar from cloudinary 
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);


        await user.deleteOne() ;
        //logging out user after deleting profile
        res.cookie('token',null,{
            expires:new Date(Date.now()),
            httpOnly:true
        });

        //removing user from followers following
        for(let i = 0 ;i < followers.length;i++) {
            const follower = await User.findById(followers[i]);
            const index = follower.following.indexOf(userID);
            follower.following.splice(index,1);
            await follower.save()
        }
        //removing user from following's followers
        for(let i = 0 ;i < following.length;i++) {
            const follows = await User.findById(following[i]);
            const index = follows.followers.indexOf(userID);
            follows.followers.splice(index,1);
            await follows.save()
        }

        //delete all posts of the user 
        for(let i = 0 ;i < posts.length;i++) {
            const post = await Post.findById(posts[i]);
            await cloudinary.v2.uploader.destroy(post.image.public_id);
            await post.deleteOne();
        } 
        // removing all comment of user from all post 
        const allPosts = await Post.find();
        for(let i=0 ;i<allPosts.length ;i++){
            const post = await Post.findById(allPosts[i]._id);
            for(let j=0 ; j< post.comments.length ;j++){
                if(post.comments[j].user === userID){
                    post.comments.splice(j,1)
                }
            }
        }

        // removing all like of user from all post 
        for(let i=0 ;i<allPosts.length ;i++){
            const post = await Post.findById(allPosts[i]._id);
            for(let j=0 ; j< post.likes.length ;j++){
                if(post.likes[j] === userID){
                    post.likes.splice(j,1)
                }
            }
            await post.save();
        }
        res.status(200).json({
            success:true,
            message:"Profile Deleted"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//MYPROFILE DATA
exports.myProfile = async (req,res)=>{
    try {
        const user = await User.findById(req.user._id).populate('posts followers following');
        return res.status(200).json({
            success:true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
// GET USER PROFILE 
exports.getUserProfile = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id).populate('posts followers following');
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        res.status(200).json({
            success:true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
//GET ALL USERS
exports.getAllUsers = async (req,res)=>{
    try {
        const users = await User.find({});
        res.status(200).json({
            success:true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
//GET my posts
exports.getMyPosts = async (req,res)=>{
    try {
        const user = await User.findById(req.user._id).populate('posts');
        const posts= [] ;
        for(let i = 0 ;i <user.posts.length ;i++){
            const post = await Post.findById(user.posts[i]).populate('likes comments.user owner');
            posts.push(post);
        }
        res.status(200).json({
            success:true,
            posts
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
//GET my posts
exports.getUserPosts = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const posts= [] ;
        for(let i = 0 ;i <user.posts.length ;i++){
            const post = await Post.findById(user.posts[i]).populate('likes comments.user owner');
            posts.push(post);
        }
        res.status(200).json({
            success:true,
            posts
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}