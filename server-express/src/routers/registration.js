const express = require('express');
const router = new express.Router();
const RegistrationController = require('../controllers/registration_controller');
const registration_controller = new RegistrationController();

router.get('/registration', registration_controller.addLayout);

module.exports = router;

