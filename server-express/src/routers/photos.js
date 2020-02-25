const express = require('express');
const router = new express.Router();
const PhotoController = require('../controllers/photo_controller');
const photo_controller = new PhotoController();
const auth = require('../middleware/auth');

// router.post('/photos', validation(photoschema), pet_controller.addPet);
// router.get('/photos/:id', pet_controller.getPetById);
// router.put('/photos/:id', pet_controller.updatePet);
// router.delete('/photos/:id', pet_controller.deletePet);

// router.get('/photos', photo_controller.getPhotos);

router.delete('/photo/:image', photo_controller.deletePhoto);

module.exports = router;

