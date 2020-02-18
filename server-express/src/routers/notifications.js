const express = require('express');
const router = new express.Router();
const NotificationsController = require('../controllers/notifications_controller');
const notifications_controller = new NotificationsController();
const validation = require('../middleware/validation');
const petSchema = require('../middleware/pet_validation');

router.get('/notifications/:id', notifications_controller.getNotifications);

module.exports = router;

