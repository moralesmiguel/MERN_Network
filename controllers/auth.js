const User = require("../models/user");
require('dotenv').config();
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
var _ = require('lodash');

exports.signup = async (req, res) => {
    const userExists = await User.findOne({email:req.body.email});
    if(userExists) return res.status(403).json({
        error: "Email is taken!"
    });
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({message:"Signup successful, please log in"});
};

exports.signin = (req, res) => {
    //Find user by email
    const {email, password} = req.body;
    User.findOne({email},(err, user) => {
    //If there's an error or no user found
        if(err || !user) {
            return res.status(401).json({
                error: "User doesn't exist. Please register."
            });
        }
    //If email is found make sure it matches with password
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error:"Email and password do not match"
            });
        }
    //Generate token with user ID and JWT secret
        const token = jwt.sign({_id:user._id, role: user.role},process.env.JWT_SECRET);
    //Token in cookie
        res.cookie("cookieToken", token, {expire: new Date()+9999})
    //Response with user and token to frontend
        const {_id, name, email, role} = user;
        return res.json({token, user: {_id, email, name, role}});
    });
};

exports.signout = (req, res) => {
    res.clearCookie("cookieToken")
    return res.json({message:"Signout success!"});
};

exports.requireSignin = expressJwt({
    //If token is valid verified users id is appended to an auth key
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});
//If there's no user with that email a new one is generated if there it's updated so they're connected
exports.socialLogin = (req, res) => {
    let user = User.findOne({ email: req.body.email }, (err, user) => {
        if (err || !user) {
            // Create a new user and login
            user = new User(req.body);
            req.profile = user;
            user.save();
            // Token with user id and secret is generated
            const token = jwt.sign(
                { _id: user._id, iss: "BACKEND" },
                process.env.JWT_SECRET
            );
            res.cookie("cookieToken", token, { expire: new Date() + 9999 });
            // Response with user and token for frontend
            const { _id, name, email } = user;
            return res.json({ token, user: { _id, name, email } });
        } else {
            //Update existing user with new information
            req.profile = user;
            user = _.extend(user, req.body);
            user.updated = Date.now();
            user.save();
            // Generate token with user id and secret
            const token = jwt.sign(
                { _id: user._id, iss: "BACKEND" },
                process.env.JWT_SECRET
            );
            res.cookie("cookieToken", token, { expire: new Date() + 9999 });
            // Response with user and token for frontend
            const { _id, name, email } = user;
            return res.json({ token, user: { _id, name, email } });
        }
    });
};