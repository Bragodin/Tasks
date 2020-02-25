const Friends = require('../models/friends');
const Notification = require('../models/notification');

class FriendsService {
    constructor(){
    }
    getFriends = async (id) => {
        try {
            return await Friends.find({ $or:[ {'friend1': id}, {'friend2': id}]});
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
            await Notification.updateOne({ownerId: friends.friend1}, { $pull: { friendsNotification: { uid: friends.friend2 }}});
            console.log('friend1: ' + friends.friend1);
            console.log('friend2: ' + friends.friend2);
            const friendsToDb = await new Friends(friends);
            return friendsToDb.save();
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
}

module.exports = FriendsService;