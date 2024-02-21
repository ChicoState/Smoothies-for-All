const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')


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
        const user = new User({
            username,
            email,
            password
        })

        user.save().then(user=>{
            res.json({message:"saved user successfully"})
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router