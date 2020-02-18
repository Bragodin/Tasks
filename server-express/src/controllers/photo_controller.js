const PhotoService = require('../services/photo_service');
const photo_service = new PhotoService();


class PhotoController {
    constructor(){}
    addPhotoInCollection = async (req, res) => {
        try {

            const result = await photo_service.addPhotoInCollection(req.body);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    getPhotos = async (req, res) => {
        try {
            res.send('dddddddddddddd');
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
}
module.exports = PhotoController; 