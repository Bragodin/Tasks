const FileService = require('../services/file-service');
const file_service = new FileService();
const multer = require('multer');

class FileController {
    constructor(){

    }
    addFile = async (req, res) => {
        try {
            const result = await file_service.addFile(req, res);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
}
module.exports = FileController;