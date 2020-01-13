const questions = [{
    question: 'Число под знаком арксинуса может быть ...',
    answerOptions: ['любым', 'положительным', 'отрицательным', 'в пределах от -1 до 1 включая эти числа'],
    correctAnswer: function(){return this.answerOptions.indexOf('в пределах от -1 до 1 включая эти числа')},
    level: 1
}, 
{
    question: 'Простое суждение «Некоторые простые числа не являются четными» является',
    answerOptions: ['общеотрицательным', 'общеутвердительным', 'единичным', 'частноотрицательным', 'частноутвердительным'],
    correctAnswer: function(){return this.answerOptions.indexOf('общеутвердительным')},
    level: 1
},
{
    question: 'Понятия «литературный жанр» и «роман», «пьеса» находятся в отношении',
    answerOptions: ['противоречия', 'подчинения', 'пересечения', 'соподчинения', 'противоположности'],
    correctAnswer: function(){return this.answerOptions.indexOf('соподчинения')},
    level: 1
},
{
    question: 'Понятия «чувство» и «нежность» находятся в отношении',
    answerOptions: ['соподчинения', 'пересечения', 'подчинения', 'противоположности'],
    correctAnswer: function(){return this.answerOptions.indexOf('противоположности')},
    level: 2
},
{
    question: ' Понятия «юрист» и «адвокат» находятся в отношении',
    answerOptions: ['противоречия', 'соподчинения', 'подчинения', 'противоположности', 'пересечения'],
    correctAnswer: function(){return this.answerOptions.indexOf('противоположности')},
    level: 2
},
{
    question: ' Понятия «чувство» и «восхищение» находятся в отношении',
    answerOptions: ['противоречия', 'соподчинения', 'подчинения', 'противоположности', 'пересечения'],
    correctAnswer: function(){return this.answerOptions.indexOf('противоположности')},
    level: 3
},
{
    question: 'Понятия «спортивная игра» и «теннис» находятся в отношении',
    answerOptions: ['противоречия', 'соподчинения', 'подчинения', 'противоположности', 'пересечения'],
    correctAnswer: function(){return this.answerOptions.indexOf('противоположности')},
    level: 2
},
];

class Model {
    constructor(questions){
        this.questions = questions;
        this.rightAnswer = 0;
        this.activeQuestions;
    }
    filerQuestions(level){
        this.activeQuestions = this.questions.filter(elem => elem.level === level);
        this.questions.sort(function(){
            return Math.random() - 0.5;
        });
    }
}
class View {
    constructor(){
        this.mainBlock = document.getElementById('main');

    }
    createStartPage(){
        const nameLabel = document.createElement('label');
        const nameInput = document.createElement('input');
        const surnameLabel = document.createElement('label');
        const surnameInput = document.createElement('input');
        const levelsSelect = document.createElement('select');
        const sizeOfLevels = 3;
        const startButton = document.createElement('button');
        startButton.id = 'startButton';

        nameInput.id = 'name';
        surnameInput.id = 'surname';
        levelsSelect.id = 'select';
        nameLabel.textContent = 'Name';
        surnameLabel.textContent = 'Surname';
        startButton.textContent = 'Start Test';

        this.mainBlock.append(nameLabel);
        this.mainBlock.append(nameInput);
        this.mainBlock.append(surnameLabel);
        this.mainBlock.append(surnameInput);
        this.mainBlock.append(levelsSelect);
        this.mainBlock.append(startButton);

        let i = 1;
        while(i < sizeOfLevels + 1){
            const option = document.createElement('option');
            option.textContent = i;
            option.setAttribute('value', i);
            levelsSelect.append(option);
            i++;
        }
    }
    createQuestion(questionOptions){
        let question = document.createElement('h4');
        question.innerHTML = questionOptions.question;
        this.mainBlock.append(question);
        questionOptions.answerOptions.forEach((element) => {
            const button = document.createElement('button');
            button.className = 'answer-buttons';
            button.innerText = element;
            this.mainBlock.append(button);
        });
    }
    clear(){
        this.mainBlock.innerHTML = '';
    }
 }

class Controler {
     constructor(model, view){
        this.model = model;
        this.view = view;
        this.level;
        this.numberOfQuestion = 0;
        this.name;
        this.surname;
    }
    validation(){
        this.name = document.getElementById('name').value;
        this.surname = document.getElementById('surname').value;
        this.level = document.getElementById('select').value;
        if(this.surname && this.name && this.level){
            return true;
        }
        else {
            return false;
        }
    }

    init(){
        this.view.createStartPage();
        const startButton = document.getElementById('startButton'); 
        startButton.addEventListener('click', () => {
            if(this.validation()){
                this.view.clear();
                this.model.filerQuestions(+this.level);
                this.view.createQuestion(this.model.activeQuestions[this.numberOfQuestion]);
                this.checkAnswer();
            } else {
                alert('заполнены не все поля');
            }
        });
    }
    checkAnswer(){
        let answerButtons = document.getElementsByClassName('answer-buttons');
        console.log(answerButtons)
        for(let i = 0; i < answerButtons.length; i++){
            answerButtons[i].addEventListener('click', () => {
                if(this.model.activeQuestions[this.numberOfQuestion].correctAnswer() === i && this.model.activeQuestions[this.numberOfQuestion]){
                    this.model.rightAnswer++;
                    this.nextQuestion();
                } else {
                    this.nextQuestion();
                }
            });
        }
    }
    nextQuestion(){
        this.numberOfQuestion++;
        this.view.clear();
        if(this.model.activeQuestions[this.numberOfQuestion]){
            this.view.createQuestion(this.model.activeQuestions[this.numberOfQuestion]);
            this.checkAnswer();
        } else {
            this.view.clear();
            setTimeout(() => {
                alert(`${this.name} ${this.surname} your result is: ${this.model.rightAnswer} right answer`);
                app.init();
            }, 0);
        }
    }

 } 

const app = new Controler(new Model(questions), new View);
app.init();
