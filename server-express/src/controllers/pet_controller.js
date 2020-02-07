const PetService = require('../services/pet_service');
const pet_service = new PetService();
class PetController {
    constructor(){}
    addPet = async (req, res) => {
        try {
            const result = await pet_service.addPet(req.body);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    deletePet = async (req, res) => {
        try {
            console.log(req)
            const result = await pet_service.deletePet(req);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    updatePet = async (req, res) => {
        try {
            const result = await pet_service.updatePet(req.params.id, req.body);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    getPets = async (req, res) => {
        try {
            const result = await pet_service.getPets();
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    getPetById = async (req, res) => {
        try {
            const result = await pet_service.getPetById(req);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
}
module.exports = PetController;