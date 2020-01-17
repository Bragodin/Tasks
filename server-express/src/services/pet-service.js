const Pet = require('../models/pet');

class PetService {
    constructor(){
        this.getPets();
        this.arrPets;
        this.PetById;
    }
    getPets = async () => {
        return await Pet.find({});
    }
    getPets = async () => {
        return await Pet.find({});
    }
    getPetById = async function(req) {
        try {
            return await Pet.findById(req.params.id)
        } catch(e){
            console.log(e);
        }
    }
    addPet = async (body) => {
        try {
            const pet = new Pet(body);
            await pet.save();
            return pet;
        } catch(e){
            console.log(e);
        }
    }
    updatePet = async (id, body) => {
        try {
            return await Pet.findByIdAndUpdate(id, body);
        } catch(e) {
            console.log(e);
        }
    }
    deletePet = async (req) => {
        try {
            return await Pet.findByIdAndDelete(req.params.id);
        } catch(e){
            console.log(e);
        }
    }
}

module.exports = PetService;
