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

module.exports = router;