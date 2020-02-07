const mongoose = require('mongoose');
const Schema = require('mongoose');
const photoScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
const Photo = mongoose.model("Photo", photoScheme);

module.exports = Photo;