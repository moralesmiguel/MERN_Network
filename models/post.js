const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
//validation is handled with file in validation folder

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    picture: {
        data: Buffer,
        contentType: String
    },
    author: {
        type: ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post", postSchema);
