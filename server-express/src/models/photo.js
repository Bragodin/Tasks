const mongoose = require('mongoose');
const Schema = require('mongoose');
const photoScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    albumId: {
        type: Schema.Types.ObjectId,
        ref: "Album",
        required: true
    }
});
const Photo = mongoose.model("Photo", photoScheme);

module.exports = Photo;