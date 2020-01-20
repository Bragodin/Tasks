const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/user_controller');
const user_controller = new UserController();

router.get('/users', user_controller.getUsers);
router.post('/users', user_controller.addUser);
router.get('/users/:id', user_controller.getUserById);
router.put('/users/:id', user_controller.updateUser);
router.delete('/users/:id', user_controller.deleteUser);
router.get('/users/:id/pets', user_controller.getUserPetsById);
router.get('/:name', user_controller.getUserByName);
router.get('/:name/pets', user_controller.getPetsForUserByName);

module.exports = router;

