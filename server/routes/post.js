const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const requireLogin = require('../middleware/requireLogin')

router.get('/allposts',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id username")
    .populate("comments.postedBy","_id username")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/create', requireLogin, (req,res)=>{
    const {title,body,ingredients, tags, photo,} = req.body
    if(!title || !body || !photo){
        res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo,
        ingredients,
        tags,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost', requireLogin, (req,res) => {
    Post.find({postedBy:req.user._id})
    .populate("postedBy", "_id username")
    .then(myPost => {
        res.json({ mypost: myPost });
    })
    .catch(err => {
        console.log(err);
    })
})


//update operation
router.put('/like', requireLogin, (req,res)=>{
    Post.findByIdAndUpdate(req.body.postId, {
        $push:{likes:req.user._id}
    },
    {
        new:true
    }).then((result)=> {
        res.json(result)
    }).catch((err)=> {
        return res.status(422).json({error:err})
    }) 
})

router.put('/unlike', requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId, {
        $pull:{likes:req.user._id}
    },
    {
        new:true
    }).then((result)=> {
        res.json(result)
    }).catch((err)=> {
        return res.status(422).json({error:err})
    }) 
    
})

router.put('/comment', requireLogin, (req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push:{comments:comment}
    },
    {
        new:true
    }).populate("comments.postedBy", "_id username")
    .then((result)=> {
        res.json(result)
    }).catch((err)=> {
        return res.status(422).json({error:err})
    }) 
})

router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .then((result)=> {
        res.json(result)
    }).catch((err)=> {
        return res.status(422).json({error:err})
    }) 

})

module.exports = router