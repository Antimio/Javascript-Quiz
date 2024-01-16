//Capture HTML elements.
var highscoresList = document.querySelector("#highscores");
var clearButton = document.querySelector("#clear");

//Save the scores to the local storage and retrieve it, if there is something saved.
function saveHighscores() {
    var highscores = JSON.parse(localStorage.getItem("highScores")) || [];

    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    highscoresList.innerHTML = ''; // Clear the list first

    for (let index = 0; index < highscores.length; index++) {
        var scoreItem = highscores[index];
        var li = document.createElement("li");
        li.textContent = scoreItem.initials + " - " + scoreItem.score;
        highscoresList.appendChild(li);
    }
}

//Clear scores
function clearHighscores() {
    localStorage.removeItem("highScores");
    saveHighscores(); // Refresh the list after clearing
}

//Event listener for when the user wants to clear their scores.
clearButton.addEventListener("click", clearHighscores);

saveHighscores(); // Load highscores when the page is opened