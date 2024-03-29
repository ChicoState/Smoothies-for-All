const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const requireLogin = require('../middleware/requireLogin')

router.get('/allposts',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id username")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/create', requireLogin, (req,res)=>{
    const {title,body,photo} = req.body
    if(!title || !body || !photo){
        res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/myposts',(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("PostedBy", "_id name")
    .then(myPost=>{
        res.json({myPost})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router