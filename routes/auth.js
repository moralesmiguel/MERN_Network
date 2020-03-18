const express = require("express");
const { signup, signin, signout, socialLogin, } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {userSignupValidator} = require("../validation"); //By using index.js file doesn't have to be specified

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);
//Anytime route with :userId is encountered it will obtain the information for the user
router.param("userId", userById)
//Route for logging in using Google
router.post("/social-login", socialLogin);

module.exports = router;