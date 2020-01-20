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
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
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
    user.tokens = user.tokens.concat({ token });
    user.save();
    return token;
}

userScheme.statics.findByCredentials = async (login, password) => {
    const user = await User.findOne({ login })
    if(!user) {
        throw new Error('Unable user')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

userScheme.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});
// userSchema.pre('remove', async function(next) {
//     const user = this
//     await League.update(
//        {users: user._id},
//        {$pull: {users: user._id} },
//        {multi: true})
//     .exec();
//     await Race.remove({user: user._id}).exec();
//     next();
// })


const User = mongoose.model("User", userScheme);

module.exports = User;