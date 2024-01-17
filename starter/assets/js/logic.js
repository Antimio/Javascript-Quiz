//Capture the diferent HTML elements so we can reference them easily in our JS logic.
var timerDisplay = document.querySelector("#time");
var startButton = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var questionContainer = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices");
var endScreen = document.querySelector("#end-screen");
var finalScore = document.querySelector("#final-score");
var initialsInput = document.querySelector("#initials");
var submitButton = document.querySelector("#submit");
var feedback = document.querySelector("#feedback");
var correctSound = new Audio('./assets/sfx/correct.wav');
var incorrectSound = new Audio('./assets/sfx/incorrect.wav');

//Setting up some variable that we'll need for our timer and questions.
var currentQuestionArrayPosition = 0;
var timerCount;
var timer;

//Add an event listener to the "Start Quiz" button so that when it is clicked, the game starts.
startButton.addEventListener("click", function startGame() {

    timerCount = 75; //Set the timer at 75 seconds.
    startScreen.classList.add("hide"); //Hide the initial screen message.
    startButton.classList.add("hide"); //Hide the start button.
    questionContainer.classList.remove("hide"); //Render the questions div.
    timer = setInterval(function() { //Set a timer up to act every 1000 milliseconds.
        if (timerCount > 0) {
            timerCount--; // While the timer is more than 0, decrtement the timer variable by one unit (every 1000 milliseconds = 1 second).
        }
        timerDisplay.textContent = timerCount; // Update the visible counterpart of the timer.
        if (timerCount === 0) { //If the timer reaches zero...
            feedback.textContent = "Time's up! Game over. You lost!";
            feedback.classList.remove("hide"); // Render the feedback to the user.
            endGame();
        };
    }, 1000); // Do this function every 1000 millisecons.
    showQuestion();
});

function showQuestion() { //Render the questions to the user.
    var question = questions[currentQuestionArrayPosition];
    questionTitle.textContent = question.question;
    choices.textContent = '';
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("answer");
        button.addEventListener("click", selectAnswer);
        choices.appendChild(button);
    });
}

//Allow the user to select an answer
function selectAnswer(event) {
    var selectedAnswer = event.target.textContent;
    if (questions[currentQuestionArrayPosition].correctAnswer === selectedAnswer) {
        correctSound.play();
        feedback.textContent = "Correct!"
        feedback.classList.remove("hide");
    } else {
        incorrectSound.play();
        timerCount = Math.max(0, timerCount - 10); // Prevents time from going below zero by compating it to zero and returnig the greater of the two.
        timerDisplay.textContent = timerCount;
        feedback.textContent = "Incorrect!"
        feedback.classList.remove("hide");
    }
    currentQuestionArrayPosition++;
    if ((currentQuestionArrayPosition < questions.length) && (timerCount > 0)) {
        showQuestion();
    } else {
        endGame();
    }
}


//Stop the game
function endGame() {
    clearInterval(timer);
    questionContainer.classList.add("hide");
    if (timerCount === 0) {
        finalScore.textContent = "0 - Better luck next time!";
        feedback.textContent = "Time's up! Game over. You lost!"
        feedback.classList.remove("hide");
    } else {
        finalScore.textContent = timerCount;
    }
    endScreen.classList.remove("hide");
}

//Submit the user's initials so that they can be associated to their score.
submitButton.addEventListener("click", function() {
    var initials = initialsInput.value;
    if (initials !== null) {
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        var newScore = { score: timerCount, initials: initials };
        highScores.push(newScore);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        endScreen.classList.add("hide");
        feedback.classList.add("hide");
    }
});