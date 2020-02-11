const path = require('path');
const Album = require('../models/album');

class AlbumService {
    constructor(){
    }
    getAlbums = async () => {
        try {
            return await Album.find({});
        } catch (e) {
            console.log(e);
        }
    }
    getAlbumsByUserId = async (owner) => {
        try {

            return await Album.find({ userId: owner });
        } catch (e) {
            console.log(e);
        }
    }
    uppdateAlbum = async (id, album) => {
        try {
            return await Album.findOneAndUpdate({ _id: id }, album);
        } catch (e) {
            console.log(e);
        }
    }
    deleteAlbum = async (id) => {
        try {
            // await Pet.deleteMany({ownerId: req.params.id});
            return await Album.findByIdAndDelete(id);
        } catch(e){
            console.log(e);
        } 
    }
}

module.exports = AlbumService;