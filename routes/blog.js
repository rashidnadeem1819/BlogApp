
const express = require ("express");
const routes = express.Router();

// Import Controller
const { dummyLink, likePost, unlikePost } = require("../controllers/likeController");
const {createComment} = require("../controllers/CommentController");
const {createPost, getAllPost} = require("../controllers/postController");

// Mapping Create 
routes.get("/dummyroute", dummyLink);
routes.post("/comments/create", createComment) ;
routes.post("/posts/create", createPost);
routes.get("/posts", getAllPost);
routes.post("/likes/like", likePost);
routes.post("/likes/unlike" ,unlikePost);



// Exprot
module.exports = routes;