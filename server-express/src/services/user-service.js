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
    getUserById = async function(req) {
        return await JSON.stringify(this.arrUsers.find(el => el.id === +req.params.id));
    }
    addUser = async (body) => {
        let myFile = path.join(
            './src/users.json'
        );
        this.arrUsers.push(body);
        fs.writeFile(myFile, JSON.stringify(this.arrUsers) , () => {});
        return await this.arrUsers;
    }
    updateUser = async (id, body) => {
        let myFile = path.join(
            './src/users.json'
        );
        console.log(this.arrUsers)
        this.arrUsers.forEach( (el, i) => {
            if(el.id === id){
                this.arrUsers[i] = body;
            } 
        });
        fs.writeFile(myFile, JSON.stringify(this.arrUsers) , () => {});
        return await this.arrUsers;
    }
    deleteUser = async function(req){
        let myFile = path.join(
            './src/users.json'
        );
        this.arrUsers.forEach( (el, i) => {
            if(el.id === +req.params.id){
                this.arrUsers.splice(i, 1);
            }
        });
        fs.writeFile(myFile, JSON.stringify(this.arrUsers), (err, data) => {
            if(err){
                console.log('error');
            } else {
                console.log('ok');
            }
        });
        return await this.arrUsers;
    }
}

module.exports = UserService;