const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requireLogin = require("../middleware/requireLogin");
const {createWeeklyPost} = require("../utils/weekly");

router.get("/allposts", requireLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id username")
    .populate("comments.postedBy", "_id username")
    .sort('-createdAt')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});




// New function subpost
router.get("/getsubpost", requireLogin, (req, res) => {
  Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy", "_id username")
    .populate("comments.postedBy", "_id username")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/weeklyPost", requireLogin, async (req, res) => {
    const currentWeeklyPost = await Post.findOne({ weekly: { $ne: null } }).populate("postedBy", "_id username")
    .populate("comments.postedBy", "_id username");
  
    if (!currentWeeklyPost) {
      return res.json({ weeklyPost: await createWeeklyPost() });
    }
  
    const isPostOld = (new Date().getTime() - currentWeeklyPost.weekly.getTime()) > 7 * 24 * 60 * 60 * 1000;
    if (isPostOld) {
        await Post.findByIdAndUpdate(currentWeeklyPost._id, { weekly: null });
      return res.json({ weeklyPost: await createWeeklyPost() });
    }
  
    return res.json({ weeklyPost: currentWeeklyPost });
  });

  router.get("/savedpost", requireLogin, (req, res) => {
    Promise.all(
      req.user.saved.map((id) => {
        return Post.findById(id).populate("postedBy", "_id username");
      })
    )
    .then((savedPosts) => {
      console.log("Saved Posts:", savedPosts); // Add this line to log the output
      res.json({ saved: savedPosts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Failed to fetch saved posts' });
    });
  });
  

router.post("/create", requireLogin, (req, res) => {
  const { title, body, ingredients, tags, photo } = req.body;
  if (!title || !body || !photo) {
    res.status(422).json({ error: "Please add all the fields" });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo,
    ingredients,
    tags,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id username")
    .then((myPost) => {
      res.json({ mypost: myPost });
    })
    .catch((err) => {
      console.log(err);
    });
});

//update operation
router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id username")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.delete('/deletepost/:postId', requireLogin, (req, res) => {
  Post.findOneAndDelete({_id: req.params.postId, postedBy: req.user._id})
  .then(deletedPost => {
      if (!deletedPost) {
          return res.status(404).json({error: "Post not found or user not authorized to delete this post"});
      }
      res.json({message: "Post deleted successfully", deletedPost});
  })
  .catch(err => {
      return res.status(422).json({error: "Could not delete the post"});
  });
});

module.exports = router;
