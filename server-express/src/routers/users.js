const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const UserController = require('../controllers/user_controller');
const user_controller = new UserController();
const userSchema = require('../middleware/user_validation_scheme');
const validation = require('../middleware/validation');

router.get('/users', auth, user_controller.getUsers);
router.post('/users', validation(userSchema), user_controller.addUser);
router.get('/users/:id', auth, user_controller.getUserById);
router.put('/users/:id', auth, validation(userSchema), user_controller.updateUser);  
router.delete('/users/:id', user_controller.deleteUser);
router.get('/users/:id/pets', user_controller.getUserPetsById);
router.post('/login', user_controller.login);
router.post('/logout', auth, user_controller.logout);
router.get('/users/name/:query',  user_controller.getUsersByName);

module.exports = router;

