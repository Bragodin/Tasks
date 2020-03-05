const MessageService = require('../services/message_service');
const message_service = new MessageService();

class MessageController {
    constructor(){}
    // getDialogues = async (req, res) => {
    //     try {
    //         const result = await message_service.getDialogues(req);
    //         res.send(result);
    //     } catch (e) {
    //         res.status(400).send({error:e.message});
    //     }
    // }
    addMessage = async (req, res) => {
        try {
            const result = await message_service.addMessage(req.body);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
}

module.exports = MessageController;