// import models
const Post = require("../models/postModel");
const Like = require("../models/likeModel");



// Likes a Post 
exports.likePost = async (req,res) => {
    try{
        const {post,user} = req.body
        const like = new Like({
            post,user,
        });
        const saveLike = await like.save();


        // updated the post collection basic on this 
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes:saveLike._id }}, {new :true})
        .populate("likes")
        .exec();

        res.json({
            post:updatedPost,
        });
    }
    catch(error){
        return res.status(400).json({
            error:"Error while liking post",
        });
    }
}
// Unlike a post
exports.unlikePost = async (req,res) => {
    try{
        const {post, like }= req.body;
        // find and deleted the like collection
        const deletedLike = await Like.findOneAndDelete({post:post,_id:like});
        // Updated the post collection 
        const updatedPost = await Post.findByIdAndUpdate(post ,
                                        {$pull: {likes: deletedLike._id}},
                                     {new:true});
        res.json({
            post:updatedPost,
        });
    }
    catch(error) {
        return res.status(400).json({
            error:"Error while Unliking post",
        })
    }
}


exports.dummyLink = (req,res) => {
    res.send ("This is my dummy page");
}