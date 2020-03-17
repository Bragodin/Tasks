const Dialogues = require('../models/dialog');
const mongoose = require('mongoose');

class DialogService {
    constructor(){
    }
    getDialog = async (body) => {
        try {
            return await Dialogues.aggregate([
                    {   
                        $match: 
                        {$or: [
                            {$and: [{'users': mongoose.Types.ObjectId(body[0])}, {'users': mongoose.Types.ObjectId(body[1])}]},
                            {$and: [{'users': mongoose.Types.ObjectId(body[1])}, {'users': mongoose.Types.ObjectId(body[0])}]}
                        ]}
                    },
                    {
                        $lookup: {
                            from: "messages",
                            localField: '_id' ,
                            foreignField: "dialogId",
                            as: "messages"
                        }
                    }
            ])
            // return await Dialogues.agregate(
            //     {
            //         $match$: {users: { $all: body }}
            //     },
            //     {
            //         $lookup: {
            //             from: "messages",
            //             localField: '_id' ,
            //             foreignField: "dialogId",
            //             as: "messages"
            //         }
            //     }
            // )
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