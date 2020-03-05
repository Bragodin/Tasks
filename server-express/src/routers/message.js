const express = require('express');
const router = new express.Router();
const MessageController = require('../controllers/message_controller');
const message_controller = new MessageController();

router.post('/add', message_controller.addMessage);
// router.get('/', dialog_controller.getDialogues);

module.exports = router;

