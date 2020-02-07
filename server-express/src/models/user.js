const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true, 
        trim: true,
    },
    phone: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
});
userScheme.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString() }, 'expressapp');
    user.tokens = user.tokens.concat({ token })
    user.save();
    return token;
}
userScheme.statics.findByCredentials = async (login, password) => {
    const user = await User.findOne({login});
    if(!user) {
        throw new Error('Unable user');
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
}
// userScheme.pre('findOneAndUpdate', async function(next){
//     const user = this;
//     if(user.password.length > 0){
//         user.password = await bcrypt.hash(user.password, 8);   
//     }
//     next();
// });

userScheme.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model("User", userScheme);

module.exports = User;