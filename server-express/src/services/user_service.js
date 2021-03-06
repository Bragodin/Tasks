const User = require('../models/user');
const mongoose = require('mongoose');
const Pet = require('../models/pet');
const bcrypt = require('bcryptjs');
const Notifications = require('../models/notification');

class UserService {
    constructor(){}

    getUsers = async (page) => {
        const position = (+page.page) * (+page.count) - (+page.count);
        return await User.aggregate([
            {
                "$facet": {
                    "users": [
                        { "$match": {}},
                        { "$skip": position },
                        { "$limit" : (+page.count) },
                        { "$unset": ["password", "tokens", "__v"]}
                    ],
                    "totalCount": [
                        { "$count": "count" }
                    ],
                }
            },
            { $unwind: '$users' },
            { $unwind: '$totalCount' },
            { $replaceRoot: { newRoot: { 
                $mergeObjects: ["$users", { totalCount: "$totalCount.count"}] }} 
            }
        ]);
        // if(page && page !== 'undefined'){
        //     console.log(page)
        //     return await User.find({}).skip(+page.page).limit(+page.count);
        // } else {
        //     return await User.find({});
        // }
    }
    getUserById = async function(req) {
        try {
            return await User.findById(req.params.id).select('-password').select('-tokens');
            // .select('-tokens');
        } catch(e){
            console.log(e);
            throw e;
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
            throw e;
        }
    }

    // getUserFriendsById = async (req) => {
    //     try {
    //         return await User.aggregate([
    //             {
    //                 $match: {_id: mongoose.Types.ObjectId(req.params.id)}
    //             },
    //             {
    //                 $lookup: {
    //                     from: "friends",
    //                     localField: '_id' ,
    //                     foreignField: "ownerId",
    //                     as: "friends"
    //                 }
    //             }
    //         ]);
    //     } catch(e) {
    //         console.log(e);
    //         throw e;
    //     }
    // }

    addUser = async (req) => {
        try {
            const user = new User(req.body);
            await user.save();
            const notifications = new Notifications({ownerId: user._id});
            await notifications.save();
            const token = await user.generateAuthToken();
            this.activeToken = token;
            return { user, token }  
        } catch(e){
            console.log(e);
            throw e;
        }
    }
    login = async (req) => {
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
    updateUser = async (id, req) => {
        try {
            if(req.body.password && req.body.password.length > 0){
                req.body.password = await bcrypt.hash(req.body.password, 8);   
            }
            return await User.findOneAndUpdate({ _id: req.user.id }, req.body);
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
    deleteUser = async (req) => {
        try {
            await Pet.deleteMany({ownerId: req.params.id});
            await Notifications.deleteMany({ownerId: req.params.id});
            return await User.findByIdAndDelete(req.params.id);
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
    getUsersByName = async (nameLetter) => {
        try {
            return await User.find({ name: {$regex: `^${nameLetter}\.*`, $options: 'i'}});
        } catch(e){
            console.log(e);
            throw e;
        }
    }
}

module.exports = UserService;
