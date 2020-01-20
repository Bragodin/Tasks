const express = require('express');
const router = new express.Router();
const PetController = require('../controllers/pet_controller');
const pet_controller = new PetController();

router.get('/pets', pet_controller.getPets);
router.post('/pets', pet_controller.addPet);
router.get('/pets/:id', pet_controller.getPetById);
router.put('/pets/:id', pet_controller.updatePet);
router.delete('/pets/:id', pet_controller.deletePet);

module.exports = router;

