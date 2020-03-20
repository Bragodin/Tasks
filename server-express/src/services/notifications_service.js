const path = require('path');
const Notification = require('../models/notification');
const mongoose = require('mongoose');

class NotificationsService {
    constructor(){
    }
    getNotifications = async (id) => {
        try {
            const notifications = await Notification.findOne({ownerId: id}).populate('friendsNotification').populate('messageNotification').exec();
            return await notifications;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
    removeMessageNotification = async (req) => {
        try {
            const res = await Notification.updateOne({ownerId: req.params.userid}, { $pull: { messageNotification: { $gte: req.body.userId }}});
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    removeFriendNotification = async (req) => {
        try {  
            const res = await Notification.updateOne({ownerId: req.params.userid}, { $pull: { friendsNotification: { $gte: req.body.userId }}}, (err, data) => {
                if(data){
                    return data;
                } 
            });
            if(res){
                return {friendRequestId: req.body.userId};
            }
        } catch(e){
            console.log(e);
            throw e;
        }
    }

    addFriendNotification  = async (req) => {
        try {
            return await Notification.updateOne({ ownerId: req.params.userId }, { $push: { friendsNotification: req.body.friend }});
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
    addMessageNotification  = async (message) => {
        try {
            return await Notification.updateOne({ ownerId: message.recipient }, { $push: { messageNotification: message.ownerId}});
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
}

module.exports = NotificationsService;