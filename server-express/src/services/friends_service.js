const Friends = require('../models/friends');
const Notification = require('../models/notification');
const mongoose = require('mongoose');

class FriendsService {
    constructor(){
    }
    getFriends = async (id) => {
        try {
            // return await Friends.find({ $or:[ {'friend1': id}, {'friend2': id}]});
            const friends = await Friends.aggregate([
                {
                    $match: { $or:[ {'friend1': mongoose.Types.ObjectId(id)}, {'friend2': mongoose.Types.ObjectId(id)}]}, 
                },
                {
                    $project: 
                        { 
                            friend: {
                                $cond: { if: { $eq: [ "$friend1", mongoose.Types.ObjectId(id) ] }, 
                                then: "$friend2", else: "$friend1"
                                }
                            }                
                        }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: 'friend',
                        foreignField: "_id",
                        as: "friend"
                    }
                },
                {
                    $unwind:  "$friend" 
                },
            ]);
            return friends;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
    getUsersWithFriendsRequest = async (id) => {
        try {
            const notifications = await Notification.findOne({ownerId: id}).populate('friendsNotification').exec();
            return await notifications.friendsNotification;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
    addToFriends = async (friends) =>{
        try {
            await Notification.updateOne({ownerId: friends.friend1}, { $pull: { friendsNotification: { $gte: friends.friend2 }}});
            const friendsToDb = await new Friends(friends);
            return await friendsToDb.save();            
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
    removeFromFriends = async (friend1, friend2) =>{
        try {
            return await Friends.findOneAndDelete({ $or: [{friend1: friend1, friend2: friend2}, {friend1: friend2, friend2: friend1}]});
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
}

module.exports = FriendsService;