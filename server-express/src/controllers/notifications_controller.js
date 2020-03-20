const NotificationsService = require('../services/notifications_service');
const notifications_service = new NotificationsService();
class NotificationsController {
    constructor(){}
    getNotifications = async (req, res) => {
        try {
            const result = await notifications_service.getNotifications(req.params.id);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    addFriendNotification = async (req, res) => {
        try {
            const result = await notifications_service.addFriendNotification(req);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    removeMessageNotification = async (req, res) => {
        try {
            const result = await notifications_service.removeMessageNotification(req);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    removeFriendNotification = async (req, res) => {
        try {
            const result = await notifications_service.removeFriendNotification(req);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
}
module.exports = NotificationsController;