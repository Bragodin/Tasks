const Photo = require('../models/photo');
const mongoose = require('mongoose');
const fs = require("fs");
const path = require("path");

class PhotoService {
    constructor(){}
    deletePhoto = async (req) => {
        try {
            const res = await Photo.deleteOne({ name: req.params.image }, (err, data) => {
                if (err){
                    console.log(err);
                } else {
                    return fs.unlink(`public/uploads/${req.params.image}`, (err) => {
                        if (err) { 
                            console.log(err);
                            return err;
                        }
                        else {
                            console.log(`${req.params.image} was deleted`);
                            return data;
                        }
                    });
                }
            });
            if(res){
                return req.params.image;
            }
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
}

module.exports = PhotoService;
