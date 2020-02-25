const mongoose = require('mongoose');
const Schema = require('mongoose');
const friendsScheme = new mongoose.Schema({
    friend1: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    friend2: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
const Friends = mongoose.model("Friends", friendsScheme);

module.exports = Friends;