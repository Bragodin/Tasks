const  Messages = require('../models/message');

class MessageService {
    constructor(){
    }
    getDialogues = async (req) => {
        try {
            return await Messages.find({});
        } catch(e){
            console.log(e);
            throw e;
        }
    }
    addMessage = async (body) => {
        try {
            const message = new Messages(body);
            return await message.save(body);
        } catch(e){
            console.log(e);
            throw e;
        }
    }
}

module.exports = MessageService;