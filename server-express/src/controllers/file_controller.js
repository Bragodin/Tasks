const FileService = require('../services/file_service');
const file_service = new FileService();
class FileController {
    constructor(){}
    addFiles = async (req, res) => {
        try {
            const result = await file_service.addFiles(req, res);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    getFileByName = async (req, res) => {
        try {
            await file_service.getFileByName(req, res);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    addAvatar = async (req, res) => {
        try {
            const result = await file_service.addAvatar(req);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
}

module.exports = FileController;