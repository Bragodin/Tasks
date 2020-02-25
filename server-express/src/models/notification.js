const mongoose = require('mongoose');
const Schema = require('mongoose');
const notificationsScheme = new mongoose.Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    friendsNotification: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    messageNotification: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }]
});
const Notifications = mongoose.model("Notifications", notificationsScheme);

module.exports = Notifications;