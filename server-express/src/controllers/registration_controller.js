// const PetService = require('../services/Pet-service');
// const pet_service = new PetService();
const path = require('path');

class RegistrationController {
    constructor(){}
    addLayout = async (req, res) => {
        try {
            res.sendFile(path.join(__dirname + './../views/registration.html'));
        } catch (e){
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

}
module.exports = RegistrationController;