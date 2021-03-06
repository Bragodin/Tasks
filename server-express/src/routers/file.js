const express = require('express');
const router = new express.Router();
const FileController = require('../controllers/file_controller');
const file_controller = new FileController();
const upload = require('../middleware/get_user_file');

router.post('/files', upload.array('profiles', 4), file_controller.addFiles);
router.put('/file/avatar/:id', upload.array('profiles', 4), file_controller.addAvatar);
router.get('/file/:fileName', file_controller.getFileByName);

module.exports = router;

// 