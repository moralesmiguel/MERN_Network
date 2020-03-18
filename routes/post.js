const express = require("express");
const { getPosts, createPost, postsByUser, postById, isPoster, deletePost, updatePost, picture, singlePost } = require("../controllers/post");
const {requireSignin} = require("../controllers/auth");
const {userById} = require("../controllers/user");
const {createPostValidator} = require("../validation"); //By using index.js file doesn't have to be specified

const router = express.Router();
//Get all posts
router.get("/posts", getPosts);
//Create a new post
router.post("/post/new/:userId", requireSignin, createPost, createPostValidator);
//Obtain posts by user
router.get("/posts/by/:userId", requireSignin, postsByUser); //requireSignin could be optional
//Delete post
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
//Update post
router.put("/post/:postId", requireSignin, isPoster, updatePost);
//Picture
router.get("/post/picture/:postId", picture);
//Single post
router.get("/post/:postId", singlePost);
//Any time route with :userId is encountered it will obtain the information for the user by executing userById
router.param("userId", userById);
//Any time route with :postId is encountered it will obtain the information by executing postById
router.param("postId", postById);

module.exports = router;
