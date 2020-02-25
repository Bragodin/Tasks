const express = require('express');
const router = new express.Router();
const NotificationsController = require('../controllers/notifications_controller');
const notifications_controller = new NotificationsController();
const validation = require('../middleware/validation');
const auth = require('../middleware/auth');

router.get('/notifications/:id', auth, notifications_controller.getNotifications);
router.put('/notifications/:userId', auth, notifications_controller.addFriendNotification)
module.exports = router;

