var buttonColors = ["red", "blue", "yellow", "green"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("sounds/wrong.mp3");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

$(document).keypress(
    function () {
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    }
);

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    var userButtonAudio = "sounds/" + userChosenColor + ".mp3"
    playSound(userButtonAudio);
    animatePress("#" + userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var randomButtonAudio = "sounds/" + randomChosenColor + ".mp3"
    playSound(randomButtonAudio);
}

function playSound(name) {
    var buttonAudio = new Audio(name);
    buttonAudio.play();
}

function animatePress(currentColor) {
    $(currentColor).addClass("pressed");
    setTimeout(function () {
        $(currentColor).removeClass("pressed");
    }, 100);
}

