const Photo = require('../models/photo');
const mongoose = require('mongoose');

class PhotoService {
    constructor(){}
    addPhotoInCollection = async (body) => {
        try {
            console.log(JSON.stringify(body))
            // const pet = new Pet(body);  
            // await pet.save();
            // return pet;
            
        } catch(e){
            console.log(e);
        }
    }
}

module.exports = PhotoService;
