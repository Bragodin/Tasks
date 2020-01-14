const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/user_controller');
const user_controller = new UserController();

router.get('/users', user_controller.getUsers);
router.post('/', user_controller.addUser)
router.get('/users/:id', user_controller.getUserById);

module.exports = router;

