class EventEmitter {
  constructor() {
    this._events = {};
  }
  on(evt, listener) {
    (this._events[evt] || (this._events[evt] = [])).push(listener);
    return this;
  }
  emit(evt, arg) {
    (this._events[evt] || []).slice().forEach(lsn => lsn(arg));
  }
}

class Atm extends EventEmitter {
  constructor(id){
    super();
    this.time = Math.random() * (5000 - 2000) + 2000;
    this.state = true;
    this.atmId = id;
    this.personInAtm = null;
    this.checkState();
  }
  changeState(){
    this.state = false;
    setTimeout(() => {
      this.state = true;
    }, this.time);
  }
  checkState() {
    setTimeout(()=> {
      if(this.state === true){
        this.emit('freeAtm', this.atmId);
      }
      return this.checkState();
    }, 0);
  }
}

class Person {
  constructor(id){
    this.personId = id;
  }
};
//model
class Model extends EventEmitter {
  constructor(){
      super();
      this.turn = [];
      this.atmsArray = [];
      this.addPersonToTurn();
  }
  addAtms(i){
    this.atmsArray.push(new Atm(i));
  }
  addPersonToTurn(){   
    setTimeout(() => {
      if(this.turn.length < 15){
        if(this.turn.length !== 0){
          let personId = (this.turn[this.turn.length - 1].personId + 1);
          this.turn.push(new Person(personId));
          this.emit('personAdded');
        } else {
          let personId = 1;
          this.turn.push(new Person(personId));
          this.emit('personAdded');
        }
      } 
      return this.addPersonToTurn();
    }, 500);
  }
  removePersonFromTurn(){
      this.turn.shift(this.turn[0]);
  }
}

class View extends EventEmitter {
  constructor(){
      super();
      this.divForAtm = document.createElement('div');
      this.divForAtm.className = "div-for-atm";
      
      this.ul = document.createElement('ul');
      this.ul.className = "ul__turn";

      document.body.append(this.divForAtm);
      document.body.append(this.ul);
  }
  addPersonToTurn(number){
      let li = document.createElement('li');
      li.className = "ul__li_person";
      li.innerHTML = `<h3>${number}</h3>`;
      this.ul.append(li);
  }
  createAtm(){
    let atm = document.createElement('div');
    atm.className = "atm";
    this.divForAtm.append(atm);
  }
  removePersonFromTurn(){
      let firstElementOfTurn = document.getElementsByClassName('ul__li_person');
      console.log(firstElementOfTurn);

      let li = this.ul.firstElementChild;
      this.ul.removeChild(li);
  }
  addPersonToAtm(atmNumber, personId, time){
    let atms = document.getElementsByClassName('atm');
    let li = document.createElement('div');
    li.className = "ul__li_person";
    li.innerHTML = `<h3>${personId}</h3>`;
    atms[atmNumber].append(li);
    setTimeout(() => {
      atms[atmNumber].removeChild(li);////  CHANGE TIME
    }, time);
  }
}
//controller
class Controller extends EventEmitter {
  constructor(model, view){
      super();
      this.model = model;
      this.view = view;
      this.createAtm();
      this.createPerson();
      this.checkAtm();
      this.checkAtm();
  }
  createAtm(){
    let j = 0;
    while(j < 3){
      this.view.createAtm();
      this.model.addAtms(j);
      j++;
    }
  }
  createPerson(){
    this.model.on('personAdded', () => { this.view.addPersonToTurn(this.model.turn[this.model.turn.length - 1].personId) });
  }
  checkAtm(){
    setInterval(() => {
      let freeAtmIndex;
      let freeAtm = this.model.atmsArray.find((el) => {
        freeAtmIndex = el.atmId;
        return el.state === true;
      });
      if(freeAtm && this.model.turn.length > 0){
        this.model.atmsArray[freeAtmIndex].changeState();
        this.view.removePersonFromTurn();

        this.view.addPersonToAtm(freeAtmIndex, this.model.turn[0].personId, freeAtm.time);
        this.model.removePersonFromTurn();
      }
    }, 0);

  }
}

function stop(){
  debugger;
}

function start(){
  new Controller(new Model(), new View());
}

