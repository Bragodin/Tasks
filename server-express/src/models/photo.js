const mongoose = require('mongoose');
const Schema = require('mongoose');
const photoScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    albumId: {
        type: Schema.Types.ObjectId,
        ref: "Album",
    }, 
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});
const Photo = mongoose.model("Photo", photoScheme);

module.exports = Photo;