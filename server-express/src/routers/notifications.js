const express = require('express');
const router = new express.Router();
const NotificationsController = require('../controllers/notifications_controller');
const notifications_controller = new NotificationsController();
const auth = require('../middleware/auth');

router.get('/:id', auth, notifications_controller.getNotifications);
router.put('/:userId', auth, notifications_controller.addFriendNotification);
router.put('/message/:userid', auth, notifications_controller.removeMessageNotification);
router.put('/friend/:userid', auth, notifications_controller.removeFriendNotification);

module.exports = router;

