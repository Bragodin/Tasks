const DialogService = require('../services/dialog_service');
const dialog_service = new DialogService();

class DialogController {
    constructor(){}
    getDialogues = async (req, res) => {
        try {
            const result = await dialog_service.getDialogues(req);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    addDialog = async (req, res) => {
        try {
            console.log('add dialog contr')
            console.log(req.body)
            const result = await dialog_service.addDialog(req.body);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
}
module.exports = DialogController;