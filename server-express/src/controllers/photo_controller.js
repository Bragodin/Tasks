const PhotoService = require('../services/photo_service');
const photo_service = new PhotoService();

class PhotoController {
    constructor(){}
    deletePhoto = async (req, res) => { 
        try {
            const result = await photo_service.deletePhoto(req);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
}
module.exports = PhotoController; 