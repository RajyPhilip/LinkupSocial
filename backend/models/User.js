const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,"Please enter an email"],
        unique: [true,'Email already exists']
    },
    password: {
        type: String,
        required: [true,"Please enter a password"],
        minlength:[6,'Password must be at least 6 characters'],
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

const User = mongoose.model('User', userSchema);

module.exports = User;