var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0
var started = false;


function nextSequence(){
    level++;

    var random = Math.ceil(Math.random() * 4);
    randomChosenColor = buttonColors[random-1];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
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

function checkAnswer() {
    for(var i=0; i < gamePattern.length; i++){
        if(gamePattern[i] != userClickedPattern[i]){
            userClickedPattern.clear();
            gamePattern.clear();
            playSound("wrong");
        }
        nextSequence();
        userClickedPattern.clear();
    }
    
}


$(".btn").click(function(event){
    //var userChosenColor = this.id;
    
    var userChosenColor = $(this).attr("id");
    //console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer();
    
})




$(document).keypress(function(){
    if(! started){
        started = true;
        nextSequence();
        $("#level-title").text("Level " + level);
    }
})
 
