const express = require('express');
const router = new express.Router();
const DialogController = require('../controllers/dialog_controller');
const dialog_controller = new DialogController();

router.post('/add', dialog_controller.addDialog);
router.post('/getMyDialog', dialog_controller.getDialog);

module.exports = router;

