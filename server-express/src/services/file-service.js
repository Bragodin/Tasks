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
    getAllUploads = async (req, res) => {
        try {

        } catch (e){
            
        }
    }
}

module.exports = FileService;