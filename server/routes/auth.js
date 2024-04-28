const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')


const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')



router.get('/',(req,res)=>{
    res.send("hello")
})





router.post('/signup',(req,res)=>{
    const {username,email,password} = req.body
    if(!username || !email || !password){
         return res.status(422).json({error:"all fields required"})
    }
    User.findOne({username}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"username taken"})
        }
        bcrypt.hash(password,8)
        .then(hashedpassword=>{
            const user = new User({
                username,
                email,
                password:hashedpassword
            })
    
            user.save().then(user=>{
                res.json({message:"saved user successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    const {username,password} = req.body
    if(!username || !password){
        res.status(422).json({error:"missing either username or password"})
    }
    User.findOne({username:username})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"invalid username or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(correctPassword=>{
            if(correctPassword){
                //res.json({message:"successful signin"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,username,email,saved} = savedUser
                res.json({token,user:{_id,username,email,saved}})
            }
            else{
                return res.status(422).json({error:"invalid username or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

router.put('/saved', requireLogin, (req,res)=>{
    User.findByIdAndUpdate(req.user._id, {
        $push:{saved:req.body.postId}
    },
    {
        new:true
    }).then((result)=> {
        res.json({
            _id: result._id,
            username: result.username,
            email: result.email,
            saved: result.saved
        });
    }).catch((err)=> {
        return res.status(422).json({error:err})
    }) 
})

router.put('/unsave', requireLogin, (req,res)=>{
    User.findByIdAndUpdate(req.user._id, {
        $pull:{saved:req.body.postId}
    },
    {
        new:true
    }).then((result)=> {
        res.json({
            _id: result._id,
            username: result.username,
            email: result.email,
            saved: result.saved
        });
    }).catch((err)=> {
        return res.status(422).json({error:err})
    }) 
})

module.exports = router