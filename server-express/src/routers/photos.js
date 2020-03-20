const express = require('express');
const router = new express.Router();
const PhotoController = require('../controllers/photo_controller');
const photo_controller = new PhotoController();
const auth = require('../middleware/auth');

router.delete('/photo/:image',auth, photo_controller.deletePhoto);

module.exports = router;

