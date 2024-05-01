const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const requireLogin = require('../middleware/requireLogin');
const User = mongoose.model("User");

router.get('/user/:id', requireLogin, (req, res) => {
    User.findOne({_id: req.params.id})
        .select("-password")
        .then(user => {
            if (!user) {
                return res.status(404).json({error: "User not found"});
            }
            Post.find({postedBy: req.params.id})
                .populate("postedBy", "_id name")
                .then(posts => {
                    res.json({user, posts});
                })
                .catch(err => {
                    return res.status(422).json({error: err});
                });
        })
        .catch(err => {
            return res.status(404).json({error: "User not found"});
        });
});

router.put('/follow', requireLogin, (req, res)=>{
    User.findByIdAndUpdate(req.body.followId, {
        $push: {followers: req.user._id}
    }, {new: true}, (err, result) => {
        if (err) {
            console.error("Error following user:", err);
            return res.status(422).json({error: err.message});
        }
        User.findByIdAndUpdate(req.user._id, {
            $push: {following: req.body.followId}
        }, {new: true}).select("-password").then(result => {
            res.json(result);
        }).catch(err => {
            console.error("Error updating follower data:", err);
            return res.status(422).json({error: err.message});
        });
    });
});


router.put('/unfollow', requireLogin, (req, res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
    $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err) {
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.unfollowId}
    }, {new:true}).select("-password").then(result=>{
        res.json(result)
    }).catch(err=>{
        return res.status(422).json({error:err})
    })
    }
    )
})

module.exports = router;
