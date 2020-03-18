const _ = require("lodash");
const User = require("../models/user");
const fs = require("fs");
const formidable = require("formidable");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user)=>{
        if(err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user; //Profile added with user info
        next();
    });
};

exports.userPicture = (req, res, next) => {
    if(req.profile.picture.data){
        res.set("Content-Type", req.profile.picture.contentType)
        return res.send(req.profile.picture.data);
    }
    next();
}

exports.hasAuthorization = (req, res, next) => {
    let sameUser = req.profile && req.auth && req.profile._id == req.auth._id;
    let adminUser = req.profile && req.auth && req.auth.role == "admin";
    const authorized = sameUser || adminUser;
    if(!authorized){
        return res.status(403).json({
            error: "User is not authorized"
        });
    }
    next();
};

exports.allUsers = (req, res) => {
    User.find((err, users)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        res.json(users);
    }).select("name email updated created role");
};

exports.getUser = (req, res) => {
    //This way password and salt are not returned
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "Picture couldn't be uploaded"
            })
        }
        let user = req.profile;
        user = _.extend(user, fields);
        user.updated = Date.now();

        if(files.picture)  {
            user.picture.data = fs.readFileSync(files.picture.path)
            user.picture.contentType = files.picture.type
        }
        user.save((err,result) => {
            if(err) {
                return res.status(400).json({
                    error:err
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        });
    });
};

exports.deleteUser = (req, res, next) => {
    let user = req.profile;
    user.remove((err, user)=>{
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        res.json({message:"User has been deleted"});
    });
};