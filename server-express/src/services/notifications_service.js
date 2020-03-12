const path = require('path');
const Notification = require('../models/notification');

class NotificationsService {
    constructor(){
    }
    getNotifications = async (id) => {
        try {
            const notifications = await Notification.findOne({ownerId: id}).populate('friendsNotification').exec();
            return await notifications.friendsNotification;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
    addFriendNotification  = async (req) => {
        try {
            // const friendNotif = await Notification.updateOne({ownerId: req.params.userId}, { $pull: { friendsNotification: { $gte: req.body.friend }}});
            // if(!friendNotif.nModified){

                // console.log('push to: ' + req.params.userId);
                // console.log('owner  ID: ' + req.body.friend)
                
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