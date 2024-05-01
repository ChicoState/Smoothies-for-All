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
    followers:[{type:ObjectId,ref:'User'}],
    following:[{type:ObjectId,ref:'User'}]
})

mongoose.model("User",userSchema)