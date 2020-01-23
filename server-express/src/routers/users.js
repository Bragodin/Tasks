const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const UserController = require('../controllers/user_controller');
const user_controller = new UserController();
const userSchema = require('../middleware/user_validation_scheme');
const validation = require('../middleware/validation');
router.get('/users', user_controller.getUsers);
router.post('/users', validation(userSchema), user_controller.addUser);
router.get('/users/:id', user_controller.getUserById);
router.put('/users/:id', user_controller.updateUser);
router.delete('/users/:id', user_controller.deleteUser);
router.get('/users/:id/pets', user_controller.getUserPetsById);
router.post('/login', user_controller.login);
router.post('/logout',auth, user_controller.logout);

module.exports = router;

