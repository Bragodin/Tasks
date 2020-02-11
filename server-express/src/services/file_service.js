const path = require('path');

class FileService {
    constructor(){
    }
    addFile = async (req, res) => {
        try {
            res.send(req.files);
        } catch(e) {
            console.log(e);
        }
    }
    getFileByName = async (req, res) => {
        try {
            res.sendFile(path.join(__dirname + './../../public/uploads/' + req.params.fileName));
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = FileService;