var color = ["red", "blue", "green", "yellow"];
var computerMove = [];
var humanMove = [];
var gameover = 0;
var gamestart = 0;
var level = 1;
gameinitiater();
function gameinitiater() {
    level=1;
    gamestart=0;
    humanMove=[];
    computerMove=[];
    $("body").keypress(function (event) {
        gameover=0;
        $(".btn").off('click');
            startgame();
        $("body").off('keypress');
    })
}
function startgame() {
    if (gamestart == 0) {
        $("h1").text("level " + level);
        var randomnum = Math.floor(Math.random() * 4 + 1);
        computerMove.push(color[randomnum-1]);
        soundPlay(color[randomnum - 1]);
        keyPressAnimation(color[randomnum - 1]);
        gamestart++;
    }
    $(".btn").click(function () {
        var clickedColor = $(this).attr("id");
        soundPlay(clickedColor);
        keyPressAnimation(clickedColor);
        humanMove.push(clickedColor);
        console.log(computerMove);
        console.log(humanMove);
        var check = checkgame();
        if (check == true) {
            if(humanMove.length==computerMove.length)
            {
                humanMove=[];
                var randomnum = Math.floor(Math.random() * 4 + 1);
                computerMove.push(color[randomnum-1]);
                level++;
                setTimeout(() => {
                if(gameover==1)
                {
                    $(".btn").off("click");
                    gameend();
                    return;
                }
                soundPlay(color[randomnum - 1]);
                keyPressAnimation(color[randomnum - 1]);
                $("h1").text("level " + level);
                }, 1000);
            }
        }
        else {
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 100);
            soundPlay("invalid");
            $(".btn").off('click');
            gameend();
        }
    })
}
function soundPlay(color) {
    var tone = new Audio("sounds/" + color + ".mp3");
    tone.play();
}
function keyPressAnimation(color) {
    $("#" + color).addClass("pressed")
    setTimeout(() => {
        $("#" + color).removeClass("pressed")
    }, 100);
}
function checkgame() {
    for(var i=0;i<humanMove.length;i++)
    {
        if(humanMove[i]!=computerMove[i])
            return false;
    }
    return true;
}
function gameend() {
    gameover=1;
    $("h1").text("Game Over, Press Any Key to Restart");
    $(".btn").click(function () {
        var clickedColor=$(this).attr("id");
        soundPlay(clickedColor);
        soundPlay("invalid");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);
    })
    gameinitiater();
}