const User = require('../models/user');
const mongoose = require('mongoose');
const Pet = require('../models/pet');
class UserService {
    constructor(){}
    getUsers = async () => {
        return await User.find({})
        // .select('-tokens');
    }
    getUserById = async function(req) {
        try {
            return await User.findById(req.params.id)
            // .select('-tokens');
        } catch(e){
            console.log(e);
        }
    }
    getUserPetsById = async (req) => {
        try {
            return await User.aggregate([
                {
                    $match: {_id: mongoose.Types.ObjectId(req.params.id)}
                },
                {
                    $lookup: {
                        from: "pets",
                        localField: '_id' ,
                        foreignField: "ownerId",
                        as: "pets"
                    }
                }
            ]);
        } catch(e) {
            console.log(e);
        }
    }
    addUser = async (req) => {
        try {
            const user = new User(req.body);
            await user.save();
            const token = await user.generateAuthToken();
            this.activeToken = token;
            return { user, token }  
        } catch(e){
            console.log(e);
        }
    }
    login = async (req) => {
        console.log(req.body)
        const user = await User.findByCredentials(req.body.login, req.body.password);
        const token = await user.generateAuthToken(); 
        return { user, token }
    }
    logout = async (req) => {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
    }
    updateUser = async (id, body) => {
        try {
            console.log('UPPDATE')
            return await User.findOneAndUpdate({ _id: id }, body);
            // return await User.findByIdAndUpdate(id, body);
        } catch(e) {
            console.log(e);
        }
    }
    deleteUser = async (req) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            await Pet.deleteMany({ownerId: req.params.id});
        } catch(e){
            console.log(e);
        }
    }
    getUsersByName = async (nameLetter) => {
        try {
            return await User.find({ name: {$regex: `^${nameLetter}\.*`, $options: 'i'}});
        } catch(e){
            console.log(e);
        }
    }
}

module.exports = UserService;