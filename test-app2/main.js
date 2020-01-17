const questions = [{
    question: 'Число под знаком арксинуса может быть ...',
    answerOptions: ['любым', 'положительным', 'отрицательным', 'в пределах от -1 до 1 включая эти числа'],
    correctAnswer: function(){return this.answerOptions.indexOf('в пределах от -1 до 1 включая эти числа')},
    level: 1
}, 
{
    question: 'Мексиканский курорт Акапулько всемирно известен. Своей популярностью он во многом обязан местному климату, как нельзя лучше подходящему для отдыха. Догадавшись, что в переводе с языка ацтеков означает слово "акапулько", назовите знаменитого путешественника, побывавшего, помимо прочих интересных мест, и в городе с аналогичным названием.',
    answerOptions: ['Знайка', 'Незнайка', 'Опознайка', 'Опоздайка'],
    correctAnswer: function(){return this.answerOptions.indexOf('Незнайка')},
    level: 1
},
{
    question: 'Что измеряют спидометром?',
    answerOptions: ['Давление', 'Скорость', 'Шум', 'Температура', 'Стрес'],
    correctAnswer: function(){return this.answerOptions.indexOf('Скорость')},
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
    question: 'Радикально-авангардное объединение художников начала прошлого века, отколовшееся от "Бубнового валета", носило необычное название из двух слов, обозначающее предмет, который однажды был подарен законному владельцу. Как называлось это объединение?',
    answerOptions: ['Дубовый дом', 'Мандарин', 'Макасиновый хвост', 'Ослиный хвост', 'Кленовый сироп'],
    correctAnswer: function(){return this.answerOptions.indexOf('Ослиный хвост')},
    level: 3
},
{
    question: 'Английский ученый-психолог Дэвид Льюис утверждает, что это безопасно лишь для женщин, тогда как для мужчин может стать источником опасных болезней. Проведенные исследования показали, что лишь у четверти женщин наблюдались какие-либо незначительные отклонения, например, сердцебиение. Мужчины же, наоборот, крайне отрицательно отреагировали на это: у них участился пульс, стала проявляться аритмия, резко подскочило кровяное давление. Назовите это английским словом, которое относительно недавно проникло и в русский язык.',
    answerOptions: ['Топинг', 'Шопинг', 'Допинг', 'Стопинг', 'Допинг'],
    correctAnswer: function(){return this.answerOptions.indexOf('Шопинг')},
    level: 3
},
{
    question: 'Многие не верят в ее существование. Однако Кант считал, что с нее начинается любое человеческое знание. А еще говорят, что она подводит только тех, у кого она есть. Назовите ее.',
    answerOptions: ['Логика', 'Знание', 'Сон', 'Видение', 'Интуиция'],
    correctAnswer: function(){return this.answerOptions.indexOf('Интуиция')},
    level: 3
},
{
    question: 'Один литературный персонаж, гуляя по зоопарку и проникшись сочувствием к запертым в клетках животным, решил, что некому слову очень бы не помешала приставка "не". Что это за слово?',
    answerOptions: ['Вольер', 'Энштейн', 'Василий', 'Кант', 'Гаус'],
    correctAnswer: function(){return this.answerOptions.indexOf('Вольер')},
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
        console.log(questionOptions);
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
                this.model.rightAnswer = 0;
                this.numberOfQuestion = 0;
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
