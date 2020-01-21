const multer = require('multer');
const upload = multer({dest:'uploads/'});

class FileService {
    constructor(){
    }
    addFile = async (req) => {
        try {

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = FileService;