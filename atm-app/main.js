class EventEmitter {
    constructor() {
      this.events = {};
    }
    
    emit(eventName, data) {
      const event = this.events[eventName];
      if( event ) {
        event.forEach(fn => {
          fn.call(null, data);
        });
      }
    }
    
    subscribe(eventName, fn) {
      if(!this.events[eventName]) {
        this.events[eventName] = [];
      }
      
      this.events[eventName].push(fn);
      return () => {
        this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
      }
    }

  }

class Atm {
    constructor(id){
        this.time = Math.random() * 3000;
        this.state = true;
        this.atmId = id;
        this.personInAtm = null;
    }
}

class Person {
    constructor(){
      this.randoTimeInAtm =  Math.random() * 5000;
    }
};
//model
class Model {
    constructor(){
        this.turn = [];
        this.atmsArray = [];
        //
        this.eventOfAddPerson = new Event('addPerson');

        let i = 0;
        while(i < 3){
            this.atmsArray.push(new Atm(i));
            i++;
        }
    }
    getTurn(){
        return this.turn;
    }
    addPersonToTurn(){
        this.turn.push(new Person());
        console.log(this.turn);
    }
    removePersonToTurn(){
        this.turn.shift(turn[0]);
    }
}

class View {
    constructor(){
        this.divForAtm = document.createElement('div');
        this.divForAtm.className = "div-for-atm";
        
        this.ul = document.createElement('ul');
        this.ul.className = "ul__turn";

        document.body.append(this.divForAtm);
        document.body.append(this.ul);

    }
    addPersonToTurn(){
        let li = document.createElement('li');
        li.className = "ul__li_person";
        this.ul.append(li);
    }
    removePersonToTurn(){
        
        
    }
}

//controller
class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.view.addPersonToTurn();
        this.createPerson();
        this.createAtm();
     

           
    }
    createAtm(){
       setInterval(() => {
        console.log(this.model.atmsArray); 
       }, 3000);
    }
    createPerson(){
        setTimeout(() => {
            this.model.addPersonToTurn();
            this.view.addPersonToTurn();
            return this.createPerson();
        }, Math.random() * 3000);
    }
    updateTurn(){
        // setInterval(() => {
        //    this.view.addPersonToTurn();
        // }, 3000);
    }
}


const app = new Controller(new Model(), new View());