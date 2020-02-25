const Photo = require('../models/photo');
const mongoose = require('mongoose');
const fs = require("fs");
const path = require("path");

class PhotoService {
    constructor(){}
    deletePhoto = async (req) => {
        try {
            return await Photo.deleteOne({ name: req.params.image }, (err, data) => {
                if (err){
                    console.log(err);
                } else {
                    fs.unlink(`public/uploads/${req.params.image}`, (err) => {
                        if (err) console.log(err);
                        else console.log(`${req.params.image} was deleted`);
                    });
                }
            });
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
}

module.exports = PhotoService;
