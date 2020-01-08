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

class Atm {
  constructor(id){
    this.liveTime = 0;
    this.time = Math.random() * (5000 - 2000) + 2000;
    this.timeForFixAtm = Math.random() * (10000 - 5000) + 5000;
    this.state = true;
    this.atmId = id;
    this.personInAtm = null;
  }
  changeState(){
    this.state = false;
    setTimeout(() => {
      this.state = true;
    }, this.time);
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
      this.prevPersonId = 1;
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
          this.turn.push(new Person(this.prevPersonId++));
          this.emit('personAdded');
        } else { 
          this.turn.push(new Person(this.prevPersonId++));
          this.emit('personAdded');
        }
      } 
      return this.addPersonToTurn();
    }, Math.random() * (1000 - 500) + 500); // for clarity, the speed is increased (require - Math.random() * (3000 - 1000) + 1000) )
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
      let li = this.ul.firstElementChild;
      this.ul.removeChild(li);
  }
  addAndRemovePersonInAtm(atmNumber, personId, time){
    let atms = document.getElementsByClassName('atm');
    let li = document.createElement('div');
    li.className = "ul__li_person";
    li.innerHTML = `<h3>${personId}</h3>`;
    atms[atmNumber].append(li);
    setTimeout(() => {
      atms[atmNumber].removeChild(li);
    }, time);
  }
  crashAtm(atmNumber){
    let atms = document.getElementsByClassName('atm');
    atms[atmNumber].innerHTML = `<h3>Broke atm</h3>`;
    atms[atmNumber].style.background = "red";
  }
  fixAtm(atmNumber){
    let atms = document.getElementsByClassName('atm');
    let h3 = atms[atmNumber].getElementsByTagName('h3')[0];
    atms[atmNumber].removeChild(h3);
    atms[atmNumber].style.background = "brown";
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
        if(freeAtm.liveTime === 10){
          freeAtm.state = false;
          this.view.crashAtm(freeAtm.atmId);
          setTimeout(() => {
            freeAtm.liveTime = 0;
            freeAtm.state = true;
            this.view.fixAtm(freeAtm.atmId);
          }, freeAtm.timeForFixAtm);
        } else {
          this.model.atmsArray[freeAtmIndex].changeState();
          this.view.removePersonFromTurn();
          this.view.addAndRemovePersonInAtm(freeAtmIndex, this.model.turn[0].personId, freeAtm.time);
          this.model.removePersonFromTurn();
          freeAtm.liveTime++;
        }
      }
    }, 0);
  }
}

function debug(){
  debugger;
}

function start(){
  new Controller(new Model(), new View());
}



