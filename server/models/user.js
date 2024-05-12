const { ObjectId } = require('bson')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    saved:[{
        type:ObjectId,
        ref:"Post"
    }],
    pic:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
    }]
})

mongoose.model("User",userSchema)