const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    likes:[{
        type:ObjectId,
        ref:"User"
    }],
    comments:[{
        text:String,
        postedBy:{
            type:ObjectId,
            ref:"User"
        }
    }],
    ingredients:[{
        text:String
    }],
    tags:[{
        text:String
    }],
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
    weekly: {
        type: Date,
        default: null,
        required: false
    },
},{timestamps:true})

mongoose.model("Post",postSchema)