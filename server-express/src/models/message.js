const mongoose = require('mongoose');
const Schema = require('mongoose');
const messageScheme = new mongoose.Schema({
    dialogId: {
        type: Schema.Types.ObjectId,
        ref: "Dialogues",
        required: true
    }, 
    message: {
        type: String,
        required: true
    }
});

const Messages = mongoose.model("Messages", messageScheme);

module.exports = Messages;