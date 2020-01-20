const mongoose = require('mongoose');
const Schema = require('mongoose');

const petScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    kind: {
        type: String,
        required: false
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Pet = mongoose.model("Pet", petScheme);

module.exports = Pet;