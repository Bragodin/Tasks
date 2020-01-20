const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    surname: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userScheme);

module.exports = User;