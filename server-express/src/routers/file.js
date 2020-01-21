const express = require('express');
const router = new express.Router();

const multer = require('multer');
const upload = multer({dest:'public/uploads'});

const FileController = require('../controllers/file_controller');
const file_controller = new FileController();

// router.get('/pets', pet_controller.getPets);
// router.post('/pets', pet_controller.addPet);
// router.get('/pets/:id', pet_controller.getPetById);
// router.put('/pets/:id', pet_controller.updatePet);
// router.delete('/pets/:id', pet_controller.deletePet);

// router.post('/files', file_controller.addFile);

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});


router.post('/file', upload.array('profiles', 4), (req, res) => {
    try {
      res.send(req.file);
    }catch(err) {
      res.send(400);
    }
  });
router.get('/file', (req, res) => {
    try {
      res.sendFile(req.file);
    }catch(err) {
      res.send(400);
    }
  });


module.exports = router;

