const Album = require('../models/album');
const mongoose = require('mongoose');
const Photo = require('../models/photo');
const fs = require('fs');

class AlbumService {
    constructor(){
    }
    getAlbums = async () => {
        try {
            return await Album.find({});
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    getAlbumsByUserId = async (owner) => {
        try {
            return await Album.aggregate([
                {
                    $match: { userId: mongoose.Types.ObjectId(owner) }
                },
                {
                    $lookup: {
                        from: "photos",
                        localField: '_id' ,
                        foreignField: "albumId",
                        as: "photosName"
                    }
                }
            ]);
            // return await Album.find({ userId: owner });
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
            throw e;
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
            let photos = await Photo.find({albumId: req.params.albumId});
            console.log(photos)
            // if(req.user.id === req.body.userId){
                await Photo.deleteMany({ albumId: req.params.albumId }, (err, data) => {
                    if(err) {
                        console.log(err);
                    } else {
                        for(let item of photos){
                            fs.unlink(`public/uploads/${item.name}`, (err) => {
                                if (err) console.log(err);
                                else console.log(`${item.name} was deleted`);
                            });
                        }
                    }
                });
                return await Album.findByIdAndDelete(req.params.albumId);
            // }
        } catch(e){
            console.log(e);
            throw e;
        } 
    }
}

module.exports = AlbumService;