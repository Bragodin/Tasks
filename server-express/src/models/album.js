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
    photosName: [{
        type: String,
        required: true
    }]
    }, 
    { 
        timestamps: { createdAt: 'created_at' } 
    });
const Album = mongoose.model("Album", albumScheme);

module.exports = Album;