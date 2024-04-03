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
    }]

})

mongoose.model("User",userSchema)