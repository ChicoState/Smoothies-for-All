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
                .exec()
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

// Follow and unfollow 
router.put('/follow', requireLogin, (req, res)=> {
    User.findByIdAndUpdate(req.body.followId, {
        $push: {followers: req.user._id}
    }, {new:true
    }).catch((err)=>{
        console.log("Error following user:", err);
        return res.status(422).json({error: err.message});
    })
    User.findByIdAndUpdate(req.user._id, {
        $push: {following: req.body.followId}
    }, {new:true})
    .select("-password")
    .then((result)=> {
        res.json(result);
    }).catch((err)=>{
        console.log("Error updating follower data:", err);
        return res.status(422).json({error: err.message});
    })
});

router.put('/unfollow', requireLogin, (req, res)=> {
    User.findByIdAndUpdate(req.body.unfollowId, {
        $pull: {followers: req.user._id}
    }, {new:true
    }).catch((err)=>{
        console.log("Error following user:", err);
        return res.status(422).json({error: err.message});
    })
    User.findByIdAndUpdate(req.user._id, {
        $pull: {following: req.body.followId}
    }, {new:true})
    .select("-password")
    .then((result)=> {
        res.json(result);
    }).catch((err)=>{
        console.log("Error updating follower data:", err);
        return res.status(422).json({error: err.message});
    })
});

// router.put('/updatepic', requireLogin, (req, res)=>{
//     User.findByIdAndUpdate(req.user._id, {$set:{pic:req.body.pic}}, {new:true},
//         (err,result)=>{
//          if(err) {
//             return res.status(422).json({error: "pic cannot be updated"});
//          }
//          res.json(result);
//     })
// })

router.put('/updatepic', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, {$set: {pic: req.body.pic}}, {new: true})
        .select('-password')  // Exclude the password field for security
        .then(result => {
            if (!result) {
                return res.status(404).json({error: "User not found"});
            }
            res.json(result);
        })
        .catch(err => {
            console.error("Failed to update profile picture:", err);
            res.status(500).json({error: "Internal server error"});
        });
});

module.exports = router;