//Variable Declaration
var timerEl = document.getElementById('timer');
var textEl = document.getElementById('text');
var titleEl = document.getElementById('title');
var timerEl = document.getElementById('timer');
var btnEl = document.getElementById('buttons');
var resultEl = document.getElementById('result');
var seconds = 60;
var wrongAnswer = 0
timerEl.textContent = "Time: " + seconds;
var timer;

// Array that contains objects of the questions and answers. If it works....
var quizStorage = [
    {
        question: "Commonly used data types DO NOT include:",
        answer:  "alerts",
        option1: "strings",
        option2: "booleans",
        option3: "alerts",
        option4: "numbers",
    }
    ,
    {
        question: "The condition in an if / else statement is enclosed within _____",
        answer: "parenthesis",
        option1: "quotes",
        option2: "curly brackets",
        option3: "parenthesis",
        option4: "square brackets",
    }
    ,
    {
        question: "Arrays in Javascript can be used to store _____",
        answer: "all of the above",
        option1: "Numbers and Strings",
        option2: "Other Arrays",
        option3: "booleans",
        option4: "all of the above",
    }
    ,
    {
        question: "A very useful tool used during development and debuggin for printing content to the debugger is: ",
        answer: "console.log",
        option1: "Javascript",
        option2: "terminal/bash",
        option3: "for loops",
        option4: "console.log",
    }
    ,
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        answer:  "quotes",
        option1: "commas",
        option2: "quotes",
        option3: "curley brackets",
        option4: "parenthesis",
    }
]


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
    textEl.textContent = "";
    startTimer();
    nextQuestion();
    
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) );
  }

function btnGen(text, location){
    var btn = document.createElement('button');
    btn.dataset.answer = text;
    btn.innerText = text;
    btn.id = text;
    location.appendChild(btn)
}

function startTimer () {
    timer = setInterval(function() {
        seconds--;
        seconds = seconds - wrongAnswer;
        wrongAnswer = 0;
        if(seconds <= 0) {
            clearInterval(timer);
            clrBtns();
            gameOver();
        }
        timerEl.textContent = "Time: " + seconds;
    } ,1000);}
    

function checkAnswer (event) {
    var selection = event.target; 
    var answer = selection.dataset.answer;
    if (quizStorage[numb].answer === answer){
        resultEl.textContent = "CORRECT! The answer is: " + quizStorage[numb].answer
    }
    else {
        resultEl.textContent = "INCORRECT! The answer is: " + quizStorage[numb].answer
        wrongAnswer = wrongAnswer + 10;
    }
    
    quizStorage.splice(numb,1);
    console.log(quizStorage);
    if(quizStorage.length != 0){  
        numb = random(0, (quizStorage.length));
        clrBtns();
        nextQuestion(); 
    }
    else {
        clearInterval(timer);
        clrBtns();
        gameOver();
    }
}

function nextQuestion(event){
    titleEl.textContent = quizStorage[numb].question; 
    btnGen(quizStorage[numb].option1, btnEl);
    btnGen(quizStorage[numb].option2, btnEl);
    btnGen(quizStorage[numb].option3, btnEl);
    btnGen(quizStorage[numb].option4, btnEl);
    
}

function clrBtns (){
    while (btnEl.firstChild){
        btnEl.removeChild(btnEl.firstElementChild);
    }
}

function gameOver () {
    titleEl.textContent = "All done!"
    textEl.textContent = "Score:  " + seconds;
    var inputEl = document.createElement('input');
    inputEl.id = "intials";
    resultEl.appendChild(inputEl);
    resultEl.textContent = "Enter intials: ";
    btnGen("Submit", resultEl);       
    btnGen("Play Again", resultEl);


}
function scoreboard (){
    titleEl.textContent = "SCOREBOARD";
}


// Event Listerns

textEl.addEventListener("click", startQuiz);
btnEl.addEventListener("click", checkAnswer);