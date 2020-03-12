const FriendsService = require('../services/friends_service');
const friends_service = new FriendsService();
class FriendsController {
    constructor(){}
    getFriends = async (req, res) => {
        try {
            const result = await friends_service.getFriends(req.params.id);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }

    getUsersWithFriendsRequest = async (req, res) => {
        try {
            const result = await friends_service.getUsersWithFriendsRequest(req.params.id);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    addToFriends = async (req, res) => {
        try {
            const result = await friends_service.addToFriends(req.body);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        } 
    }

    removeFromFriends = async (req, res) => {
        try {
            const result = await friends_service.removeFromFriends(req.query.friend1, req.query.friend2);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        } 
    }
}
module.exports = FriendsController;