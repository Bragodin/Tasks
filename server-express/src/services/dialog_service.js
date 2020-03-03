const Dialogues = require('../models/dialog');

class DialogService {
    constructor(){
    }
    getDialogues = async (req) => {
        try {
            return await Dialogues.find({});
        } catch(e){
            console.log(e);
            throw e;
        }
    }
    addDialog = async (body) => {
        try {
            const dialog = new Dialogues(body);
            await dialog.save(body);
            return dialog;  
        } catch(e){
            console.log(e);
            throw e;
        }
    }
}

module.exports = DialogService;