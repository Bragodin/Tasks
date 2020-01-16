const fs = require("fs");
const path = require('path');
const User = require('../models/user');

class UserService {
    constructor(){
        this.getUsers();
        this.arrUsers;
        this.userById;
    }
    getUsers = async () => {
        // let myFile = path.join(
        //     './src/users.json'
        // );
        // fs.readFile(myFile, 'utf-8', (err, data) =>{
        //     if(err){
        //         console.log('File don\'t find');
        //     } else {
        //         data = JSON.parse(data);
        //         this.arrUsers = data;
        //     }
        // });
        // return await this.arrUsers;
        return await User.find({});
    }
    getUserById = async function(req) {
        // return await JSON.stringify(this.arrUsers.find(el => el.id === +req.params.id));
        try {
            return await User.findById(req.params.id)
        } catch(e){
            console.log(e);
        }
    }
    addUser = async (body) => {
        // let myFile = path.join(
        //     './src/users.json'
        // );
        // this.arrUsers.push(body);
        // fs.writeFile(myFile, JSON.stringify(this.arrUsers) , (err) => {
        //     console.log(err);
        // });
        // return await this.arrUsers;
        try {
            const user = new User(body);
            await user.save();
            return user;
        } catch(e){
            console.log(e);
        }
    }
    updateUser = async (id, body) => {
        // let myFile = path.join(
        //     './src/users.json'
        // );
        // console.log(this.arrUsers)
        // this.arrUsers.forEach( (el, i) => {
        //     if(el.id === id){
        //         this.arrUsers[i] = body;
        //     } 
        // });
        // fs.writeFile(myFile, JSON.stringify(this.arrUsers) ,(err) => {
        //     console.log(err);
        // });
        // return await this.arrUsers;
        try {
            return await User.findByIdAndUpdate(id, body);
        } catch(e) {
            console.log(e);
        }
    }
    deleteUser = async (req) => {
        // let myFile = path.join(
        //     './src/users.json'
        // );
        // this.arrUsers.forEach( (el, i) => {
        //     if(el.id === +req.params.id){
        //         this.arrUsers.splice(i, 1);
        //     }
        // });
        // fs.writeFile(myFile, JSON.stringify(this.arrUsers), (err) => {
        //     console.log(err);
        // });
        // return await this.arrUsers;
        try {
            return await User.findById(req.params.id).remove();
        } catch(e){
            console.log(e);
        }
    }
}
module.exports = UserService;
