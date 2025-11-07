// Import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");


// business logic
exports.createComment = async (req,res) => {
    try{
        // fetch data from req body
        const {post, user, body} = req.body
        // create a comment object
        const comment = new Comment({
             post,user,body
        });
        // save the new comment into the database
        const savedComments = await comment.save();

        // find the post by ID , add the new comments to its comments arrays
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComments._id}}, {new: true} )
        .populate("comments") //populate the comments array with comment documents
        .exec();

        res.json({
            post: updatedPost,
        }) 
    }

    catch(error) {
        return res.status(500).json({
            error: "Error while Creating comments" , 
        });

    }
}