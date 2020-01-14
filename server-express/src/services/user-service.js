const fs = require("fs");
const path = require('path');

class UserService {
    constructor(){
        this.getUsers();
        this.arrUsers;
        this.userById;
    }
    getUsers = async () => {
        let myFile = path.join(
            './src/users.json'
        );
        fs.readFile(myFile, 'utf-8', (err, data) =>{
            if(err){
                console.log('File don\'t find');
            } else {
                data = JSON.parse(data);
                this.arrUsers = data;
            }
        });
        return await this.arrUsers;
    }
    getUserById = async (req) => {
        let myFile = path.join(
            './src/users.json'
        );
        fs.readFile(myFile, 'utf-8', (err, data) =>{
            if(err){
                console.log('File don\'t find');
            } else {
                data = JSON.parse(data);
                // data.find(el => el.id === req.params.id);
                // console.log(data);
                console.log('eeeeeeeee'  + req.params.id);
                this.userById = data;
            }
        });

        return await this.userById;
    }
    addUser = async () => {

    }
}

module.exports = UserService;