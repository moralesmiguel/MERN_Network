const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");
const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    picture: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        default: "subscriber"
    },
    following: [{type: ObjectId, ref: "User"}],
    followers: [{type: ObjectId, ref: "User"}],
});

userSchema.virtual('password')
.set(function(password){
    //Creates a temporary variable called password
    this._password = password
    //Generate a timestamp
    this.salt = uuidv1()
    //Encrypt password
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

//Methods
userSchema.methods={
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
        if(!password) return "";
        try{
            return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);