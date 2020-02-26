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
                    $match: { $or:[ {'friend1': mongoose.Types.ObjectId(id)}, {'friend2': mongoose.Types.ObjectId(id)}]} 
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
                }
            ]);
            console.log(friends);
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
            return friendsToDb.save();
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
}

module.exports = FriendsService;