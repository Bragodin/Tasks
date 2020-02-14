const AlbumService = require('../services/album_service');
const album_service = new AlbumService();
class AlbumController {
    constructor(){}
    getAlbums = async (req, res) => {
        try {
            const result = await album_service.getAlbums();
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    getAlbumsByUserId = async (req, res) => {
        try {
            const result = await album_service.getAlbumsByUserId(req.params.userId);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    uppdateAlbum = async (req, res) => {
        try {
            const result = await album_service.uppdateAlbum(req.params.id, req);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    deleteAlbum = async (req, res) => {
        try {
            const result = await album_service.deleteAlbum(req);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    addAlbum = async (req, res) => {
        try {
            const result = await album_service.addAlbum(req);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
}
module.exports = AlbumController;