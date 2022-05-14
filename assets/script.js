//Variable Declaration
var timerEl = document.getElementById('timer');
var textEl = document.getElementById('text');
var titleEl = document.getElementById('title');
var timerEl = document.getElementById('timer');
var btnEl = document.getElementById('buttons');
var resultEl = document.getElementById('result');
var seconds = 60;
timerEl.textContent = "Time: " + seconds;
// Javascript array that contains objects of the questions and answers. If it works....
var quizStorage = [
    {
    question: "What is Javascript?",
    answer:  "A programming langauge",
    option1: "A programming language",
    option2: "Wrong 2",
    option3: "Wrong 3",
    option4: "Wrong!",
    }
    ,
    {
    question: "Another question please",
    answer: "Right!",
    option1: "Wrong 1",
    option2: "Wrong 2",
    option3: "Wrong 3",
    option4: "Right!",
    }
    ,
    {
    question: "This is the third question",
    answer: "Right!",
    option1: "Wrong 1",
    option2: "Wrong 2",
    option3: "Wrong 3",
    option4: "Right!",
    }
]

var timer = setInterval(function() {
    seconds--;
    timerEl.textContent = "Time: " + seconds;
    if(seconds === 0) {
        clearInterval(timer);
    }
} ,1000);

// Main 
    displayMain();
    var numb = random(0, (quizStorage.length));

// Fucntions 
function displayMain() {
    titleEl.textContent = "Welcome to the Code Camp Quiz!";
    timerEl.textContent = "Time: " + seconds;
    textEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds!"
    btnGen("Start Quiz", textEl);
}

function startQuiz (event){
    console.log(event);
    event.preventDefault();
    textEl.textContent = "----------------------";
    clrBtns();
        console.log(numb);
        titleEl.textContent = quizStorage[numb].question; 
        btnGen(quizStorage[numb].option1, btnEl);
        btnGen(quizStorage[numb].option2, btnEl);
        btnGen(quizStorage[numb].option3, btnEl);
        btnGen(quizStorage[numb].option4, btnEl);
}

/*function timerStart () {
    var timer = setInterval(function() {
        seconds--;
        timerEl.textContent = "Time: " + seconds;
        if(seconds === 0) {
            clearInterval(timer);
            timer = 0;
        }
    } ,1000);
} */

function random(min, max) {
    return Math.floor(Math.random() * (max - min) );
  }

function btnGen(text, location){
    var btn = document.createElement('button');
    btn.dataset.answer = text;
    btn.innerText = text;
    location.appendChild(btn)
}

function nextQuestion(event){
    var selection = event.target;
    var answer = selection.dataset.answer;
    console.log(answer);
    if (quizStorage[numb].answer === answer){
        resultEl.textContent = "CORRECT! The answer is: " + quizStorage[numb].answer
    }
    else {
        resultEl.textContent = "INCORRECT! The answer is: " + quizStorage[numb].answer
        seconds = seconds - 10;
    }
    
    quizStorage.splice(numb,1);
    console.log(quizStorage);
    if(quizStorage.length != 0){  
        numb = random(0, (quizStorage.length));
        clrBtns();
        startQuiz(event)
    }
    else {
        clearInterval(timer);
        clrBtns();
        textEl.textContent = "GAME OVER!!";
    }
}

function clrBtns (){
    while (btnEl.firstChild){
        btnEl.removeChild(btnEl.firstElementChild);
    }
}


// Event Listerns

textEl.addEventListener("click", startQuiz);
btnEl.addEventListener("click", nextQuestion);
