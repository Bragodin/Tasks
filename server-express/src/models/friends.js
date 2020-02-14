const mongoose = require('mongoose');
const Schema = require('mongoose');
const friendsScheme = new mongoose.Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    friendsId: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }]
});
const Friends = mongoose.model("Friends", friendsScheme);

module.exports = Friends;