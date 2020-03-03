const  Messages = require('../models/message');

class MessageService {
    constructor(){
    }
    getDialogues = async (req) => {
        try {
            return await  Messages.find({});
        } catch(e){
            console.log(e);
            throw e;
        }
    }
    addMessage = async (body) => {
        try {
            console.log(body);
            const message = new Messages(body);
            await message.save(body);
            return message;  
        } catch(e){
            console.log(e);
            throw e;
        }
    }
}

module.exports = MessageService;