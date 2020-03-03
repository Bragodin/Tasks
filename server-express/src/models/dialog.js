const mongoose = require('mongoose');
const Schema = require('mongoose');
const dialogScheme = new mongoose.Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true
    }] 
});
const Dialogues = mongoose.model("Dialogues", dialogScheme);

module.exports = Dialogues;