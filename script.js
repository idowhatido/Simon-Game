var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0
var started = false;


function nextSequence(){
    userClickedPattern = [];
    level++;

    var random = Math.ceil(Math.random() * 4);
    randomChosenColor = buttonColors[random-1];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("#level-title").text("Level " + level);
}

function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]== userClickedPattern[currentLevel]){
        console.log("less go");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }
    }
    else{
        playSound("wrong")
        console.log("oof");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }
}

function startOver(){
    level = 0;
    gamePattern = []
    started = False
}   


$(".btn").click(function(event){
    //var userChosenColor = this.id;
    
    var userChosenColor = $(this).attr("id");
    //console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    
})




$(document).keypress(function(){
    if(! started){
        started = true;
        nextSequence();
        $("#level-title").text("Level " + level);
    }
})
 
