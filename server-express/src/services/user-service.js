const User = require('../models/user');
const mongoose = require('mongoose');

class UserService {
    constructor(){
        this.getUsers();
        this.arrUsers;
        this.userById;
    }
    getUsers = async () => {
        return await User.find({});
    }
    getUserByName = async (userName) => {
        return await User.find({name: userName});
    }
    getUserById = async function(req) {
        try {
            return await User.findById(req.params.id);
        } catch(e){
            console.log(e);
        }
    }
    getPetsForUserByName = async (req) => {
        try {
            return await User.aggregate([
                {
                $lookup: {
                    from: "pets",
                    localField: '_id' ,
                    foreignField: "ownerId",
                    as: "pets"
                }
                },
                {
                    $match: {name: req.params.name}
                }
            ]);
        } catch (e) {
            console.log(e);
        }
    }
    getUserPetsById = async (req) => {
        try {
            return await User.aggregate([
                {
                $lookup: {
                    from: "pets",
                    localField: '_id' ,
                    foreignField: "ownerId",
                    as: "pets"
                 }
                },
                {
                    $match: {_id: mongoose.Types.ObjectId(req.params.id)}
                }
            ]);
        } catch(e) {
            console.log(e);
        }
    }
    addUser = async (body) => {
        try {
            const user = new User(body);
            await user.save();
            return user;
        } catch(e){
            console.log(e);
        }
    }
    updateUser = async (id, body) => {
        try {
            return await User.findByIdAndUpdate(id, body);
        } catch(e) {
            console.log(e);
        }
    }
    deleteUser = async (req) => {
        try {
            return await User.findByIdAndDelete(req.params.id);
        } catch(e){
            console.log(e);
        }
    }
}

module.exports = UserService;
