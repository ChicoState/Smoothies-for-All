const mongoose = require("mongoose");
const Post = mongoose.model("Post");

module.exports.createWeeklyPost = async () => {
    const totalPosts = await Post.countDocuments().exec();
    const random = Math.floor(Math.random() * totalPosts);
    const newWeeklyPost = await Post.findOne().skip(random).populate("postedBy", "_id username")
    .populate("comments.postedBy", "_id username");

      if (newWeeklyPost.length > 0) {
        await Post.findByIdAndUpdate(newWeeklyPost[0]._id, { weekly: new Date() });
        return newWeeklyPost[0];
      }
    
      return null;
}