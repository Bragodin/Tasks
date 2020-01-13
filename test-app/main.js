class Model {
    constructor(){
        this.questions = [{
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
        this.randomizeTasks();
    }
    randomizeTasks(){
        this.questions.sort(function(){
            return Math.random() - 0.5;
        });
    }
    randomizeOptions(){
        this.questions.forEach(elem => {
            elem.answerOptions.sort(function(){
                return Math.random() - 0.5;
            });

            // -------------------------
            elem.correctAnswer();
        });
    }
}

class View {
    constructor(){
        this.questionsBox = document.getElementsByClassName('questions-box')[0];   
    }
    addQuestion(question, options, index){
        let div = document.createElement('div');
        div.className = "questions-box__question";
        div.innerHTML = `<h4>${question}</h4>`;
        this.questionsBox.append(div);

        let boxForAnwers = document.createElement('div');
        boxForAnwers.className = "questions-box__question_box-for-anwers";
        div.append(boxForAnwers);

        let i = 0;
        while(i < options.length){
            let input = document.createElement('input');
            let label = document.createElement('label');
            let divForQuestion = document.createElement('div');
            divForQuestion.className = 'questions-box__question_answer';
            input.type = 'radio';
            input.className = 'questions-box__question_answer_radiobutton';
            input.id = `inputNumber${index}${i}`;
            label.setAttribute('for', `inputNumber${index}${i}`)
            label.innerHTML = `${options[i]}`;
            boxForAnwers.append(divForQuestion);
            divForQuestion.append(input);
            divForQuestion.append(label);
            i++;
        }
    }
    doDesible(blockNumber, answerNumber, color){
        let divForCheck = document.getElementsByClassName('questions-box__question')[blockNumber];
        divForCheck.style.pointerEvents = 'none';
        divForCheck.style.color = 'gray';
        let answer = divForCheck.getElementsByClassName('questions-box__question_answer')[answerNumber];
        answer.style.color = color;

    }
    removeQuestions(){
        this.questionsBox.innerHTML = '';
    }
}

class Controler {
    constructor(model, view){
        this.stateOfQuestions = false;
        this.trueAnswer = 0;
        this.answeredQuestionsNumber = 0;
        this.model = model;
        this.view = view;
        this.nameInput;
        this.sernameInput;
        this.selectValue = 1;
        this.questions = this.model.questions; 
        this.correctQuestions;
        let button = document.getElementsByClassName('user-data__button')[0];
        button.addEventListener('click', () => {
            this.nameInput = document.getElementById('name').value;
            this.sernameInput = document.getElementById('surname').value;
            this.selectValue = +document.getElementsByClassName('user-data__select')[0].value;
            if(this.nameInput && this.sernameInput && this.selectValue && !this.stateOfQuestions){
                this.stateOfQuestions = true;
                this.createQuestions(this.selectValue);
                this.checkAnswer();
            } else if(!this.nameInput || !this.sernameInput || !this.selectValue){
                alert('Заполнены не все поля');
            }
            else{
                alert('Вы не ответили на вопроссы на этом уровне');
            }
        });
    }
    createQuestions(level){
        this.correctQuestions = this.questions.filter(elem => elem.level === level);
        this.correctQuestions.forEach((element, index) => {
            this.view.addQuestion(element.question, element.answerOptions, index);
        });
    }
    finish(){
        alert(`${this.nameInput} your result ${this.trueAnswer} correct answers`);
        this.answeredQuestionsNumber = 0;
        this.trueAnswer = 0;
        this.stateOfQuestions = false;
        this.model.randomizeTasks();

        // this.model.randomizeOptions();
        this.view.removeQuestions();
    }
    checkAnswer(){
        let answers = document.getElementsByClassName('questions-box__question_answer_radiobutton');
        for(let i = 0; i < answers.length; i++){
            answers[i].addEventListener('click', () => {
                let numberOfAnswerInBlock = +answers[i].id[answers[i].id.length - 1];
                let numberOfQuestion = this.model.questions[answers[i].id[answers[i].id.length - 2]];
                let answerBlockNumber = +answers[i].id[answers[i].id.length - 2];
                
                console.log(numberOfQuestion.correctAnswer());
                if(numberOfQuestion.correctAnswer() === numberOfAnswerInBlock){
                    this.answeredQuestionsNumber++;
                    this.trueAnswer++;
                    this.view.doDesible(answerBlockNumber, numberOfAnswerInBlock, 'green');
                    setTimeout(() => {
                        if(this.answeredQuestionsNumber === this.correctQuestions.length){
                            this.finish();
                        }
                    }, 0);
                } else { 
                    this.answeredQuestionsNumber++;
                    this.view.doDesible(answerBlockNumber, numberOfAnswerInBlock, 'red');
                    setTimeout(() => {
                        if(this.answeredQuestionsNumber === this.correctQuestions.length){
                            this.finish();
                        }
                    }, 0);
                }
            });
        }
    }
}

const app = new Controler(new Model(), new View());