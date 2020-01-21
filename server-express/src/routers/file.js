const express = require('express');
const router = new express.Router();
const path = require('path');
const multer = require('multer');

const FileController = require('../controllers/file_controller');
const file_controller = new FileController();
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
let upload = multer({ storage: storage });

router.post('/file', upload.array('profiles', 4), file_controller.addFile);
router.get('/files', (req, res) => {
    try {
      res.sendFile(path.join(__dirname + './../../public/uploads/'));
    }catch(err) {
      res.send(400);
    }
  });

module.exports = router;

