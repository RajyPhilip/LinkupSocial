const User = require('../models/User');

//REGISTER

exports.register = async(req,res)=>{
    try {
        const {name,email,password} = req.body ;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        user = await User.create({
            name,email,password,
            avatar:{
                public_id:"sample_id",
                url:"sample url" 
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
        const user = await User.findOne({ email: email }).select('+password') ;
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