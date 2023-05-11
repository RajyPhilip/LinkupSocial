const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    caption:String,
    image:{
        public_id:String,
        url:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likes:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    }],
    comments:[
                {
                user:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User'
                },
                comment:{
                    type:String,
                    required:true,
                }
                }
            ],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;