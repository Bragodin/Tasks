const path = require('path');

class FileService {
    constructor(){
    }
    addFile = async (req, res) => {
        try {
            res.send(req.files);
        } catch(e) {
            res.send(400);
        }
    }
    getFileByName = async (req, res) => {
        try {
            res.sendFile(path.join(__dirname + './../../public/uploads/' + req.params.fileName));
        } catch (err) {
            res.send(400);
        }
    }
}

module.exports = FileService;