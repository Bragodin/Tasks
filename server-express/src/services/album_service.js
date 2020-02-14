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
    uppdateAlbum = async (id, req) => {
        try {
            if(req.user.id === req.body.userId){
                return await Album.findOneAndUpdate({ _id: id }, req.body);
            }
        } catch (e) {
            console.log(e);
        }
    }
    addAlbum = async (req) => {
        try {
            console.log('ALBOM THERE ARE')
            console.log(req.body)
            const album = new Album(req.body);
            await album.save();
            return album;  
        } catch(e){
            console.log(e);
        } 
    }
    deleteAlbum = async (req) => {
        try {
            // await Pet.deleteMany({ownerId: req.params.id});
            console.log('DELETE ALBUm')
            console.log(req.user.id)
            console.log(req.body)
            // if(req.user.id === req.body.userId){
                return await Album.findByIdAndDelete(req.params.albumId);
            // }
        } catch(e){
            console.log(e);
        } 
    }
}

module.exports = AlbumService;