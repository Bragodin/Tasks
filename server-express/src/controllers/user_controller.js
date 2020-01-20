const UserService = require('../services/user-service');
const user_service = new UserService();
class UserController {
    constructor(){}
    login = async (req, res) => {      
        try {
            const result = await user_service.login(req)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    logout =  async (req, res) => {
        try {
            await user_service.logout(req);
            res.send({responce: "successfully logout"});
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    addUser = async (req, res) => {
        try {
            const result = await user_service.addUser(req);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    getUserPetsById = async (req, res) => {
        try {
            const result = await user_service.getUserPetsById(req);
            res.status(201).send(result);
        } catch(e) {
            res.status(400).send({error:e.message});
        }
    }
    deleteUser = async (req, res) => {
        try {
            console.log(req);
            const result = await user_service.deleteUser(req);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    updateUser = async (req, res) => {
        try {
            const result = await user_service.updateUser(req.params.id, req.body);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    getUsers = async (req, res) => {
        try {
            const result = await user_service.getUsers();
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    getUserById = async (req, res) => {
        try {
            const result = await user_service.getUserById(req);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
}
module.exports = UserController;