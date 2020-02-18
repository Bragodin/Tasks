const path = require('path');

class FileService {
    constructor(){
    }
    addFiles = async (req, res) => {
        try {
            let result = []
            req.files.map( data => {
                let photo = {
                    name: data.filename,
                    userId: '',
                    albumId: '',
                    likes: []
                }
                result.push(photo)
            });
            console.log('FILESSSSSSS:')            
            console.log(result)
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