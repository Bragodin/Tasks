const express = require('express');
const router = new express.Router();
const PetController = require('../controllers/pet_controller');
const pet_controller = new PetController();
const validation = require('../middleware/validation');
const photoschema = require('../middleware/pet_validation');

router.get('/photos', pet_controller.getphotos);
// router.post('/photos', validation(photoschema), pet_controller.addPet);
// router.get('/photos/:id', pet_controller.getPetById);
// router.put('/photos/:id', pet_controller.updatePet);
// router.delete('/photos/:id', pet_controller.deletePet);

module.exports = router;

