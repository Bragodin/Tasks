const path = require('path');
const Photo = require('../models/photo');
const User = require('../models/user');

class FileService {
    constructor(){
    }
    addFiles = async (req, res) => {
        try {
            const result = []
            req.files.map( data => {
                let photo = {
                    name: data.filename,
                    userId: req.query.userId,
                    albumId: req.query.albumId,
                    likes: [] 
                }
                result.push(photo);
            });
            return await Photo.insertMany(result, (err, fises) => {
                if (err){ 
                    return console.error(err);
                } else {
                    console.log("Files inserted to Collection");
                }
            });
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
    getFileByName = async (req, res) => {
        try {
            res.sendFile(path.join(__dirname + './../../public/uploads/' + req.params.fileName));
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    addAvatar = async (req) => {
        try {
            return await User.findByIdAndUpdate({_id: req.params.id}, { $set: {avatar: req.files[0].filename}}, (err, data) => {
                if(err){
                    console.log(err)
                }
            });
        } catch (e) {
            res.status(400).send({error:e.message});
            throw e;
        }
    }
}

module.exports = FileService;