const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,"Please enter an email"],
        unique: [true,'Email already exists']
    },
    password: {
        type: String,
        required: [true,"Please enter a password"],
        // minlength:[6,'Password must be at least 6 characters'],
        select:false 
    },
    name: {
        type: String,
        required: [true,"Please enter a name"]
    },
    avatar:{
        public_id:String,
        url:String
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],

},{
    timestamps: true
});

//everytime a new user is saved in db . this pre will hash the password
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10)
    }
    next();
})

// to match while logging in 
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
//to generate token after while logging in 
userSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}

const User = mongoose.model('User', userSchema);

module.exports = User;