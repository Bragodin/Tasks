const express = require('express');
const router = new express.Router();
const NotificationsController = require('../controllers/notifications_controller');
const notifications_controller = new NotificationsController();
const auth = require('../middleware/auth');

router.get('/notifications/:id', auth, notifications_controller.getNotifications);
router.put('/notifications/:userId', auth, notifications_controller.addFriendNotification);
router.put('/notifications/message/:userid', auth, notifications_controller.removeMessageNotification);
router.put('/notifications/friend/:userid', auth, notifications_controller.removeFriendNotification);

module.exports = router;

