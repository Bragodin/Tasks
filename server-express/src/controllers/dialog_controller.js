const DialogService = require('../services/dialog_service');
const dialog_service = new DialogService();

class DialogController {
    constructor(){}
    getDialog = async (req, res) => {
        try {
            const result = await dialog_service.getDialog(req.body);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    addDialog = async (req, res) => {
        try {
            const result = await dialog_service.addDialog(req.body);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
}
module.exports = DialogController;