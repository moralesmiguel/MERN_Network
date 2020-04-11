const express = require("express");
const { userById, allUsers, getUser, updateUser, deleteUser, userPicture, hasAuthorization, addFollowing, addFollower, removeFollowing, removeFollower } = require("../controllers/user");
const {requireSignin} = require("../controllers/auth");

const router = express.Router();

router.put("/user/follow", requireSignin, addFollowing, addFollower);
router.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);
router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, hasAuthorization, updateUser);
router.delete("/user/:userId", requireSignin, hasAuthorization, deleteUser);
router.get("/user/picture/:userId", userPicture);
//Anytime route with :userId is encountered it will obtain the information for the user
router.param("userId", userById)


module.exports = router;