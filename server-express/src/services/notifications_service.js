const path = require('path');
const Notification = require('../models/notification');

class NotificationsService {
    constructor(){
    }
    getNotifications = async (id) => {
        try {
            return await Notification.find({ ownerId: id});
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
    addFriendNotification  = async (req) => {
        try {
            // const friendNotif = await Notification.updateOne({ownerId: req.params.userId}, { $pull: { friendsNotification: { $gte: req.body.friend }}});
            // if(!friendNotif.nModified){
                console.log('push to: ' + req.params.userId);
                console.log('owner  ID: ' + req.body.friend)
                return await Notification.updateOne({ ownerId: req.params.userId }, { $push: { friendsNotification: req.body.friend }});
            // } else {
            //     console.log('was deleted');
            // }
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
}

module.exports = NotificationsService;