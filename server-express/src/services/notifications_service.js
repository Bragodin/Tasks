const path = require('path');
const Notification = require('../models/notification');

class NotificationsService {
    constructor(){
    }
    getNotifications = async (id) => {
        try {
            return await Notification.findById(id);
        } catch(e) {
            console.log(e);
        }
    }
}
module.exports = NotificationsService;