const mongoose = require('mongoose');
const Schema = require('mongoose');
const albumScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: String,
        required: true
    },
    numberOfPhotos: {
        type: Number,
        required: true
    },
    photosName: [{
        type: String,
        required: true
    }]
});

const Album = mongoose.model("Album", albumScheme);

module.exports = Album;