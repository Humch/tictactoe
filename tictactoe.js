var choosenSymbol = "";
var otherSymbol = "";
var playerTurn = false;
var player = 0;
var endGame = false;
var boardGame = [0,0,0,0,0,0,0,0,0];

var winBoard = [[1,1,1,0,0,0,0,0,0],[0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,1,1,1],[1,0,0,1,0,0,1,0,0],[0,1,0,0,1,0,0,1,0],[0,0,1,0,0,1,0,0,1],[1,0,0,0,1,0,0,0,1],[0,0,1,0,1,0,1,0,0]];

var loseBoard = [[2,2,2,0,0,0,0,0,0],[0,0,0,2,2,2,0,0,0],[0,0,0,0,0,0,2,2,2],[2,0,0,2,0,0,2,0,0],[0,2,0,0,2,0,0,2,0],[0,0,2,0,0,2,0,0,2],[2,0,0,0,2,0,0,0,2],[0,0,2,0,2,0,2,0,0]];

$(".symbol").click(function() {
        choosenSymbol = this.id;
        if (choosenSymbol === "times") {
                otherSymbol = "circle";
        } else {
                otherSymbol = "times";
        }
        $('#start-modal').modal('hide');
        var startButton = document.getElementById("start-game");
        startButton.disabled = true;
        playGame();
    });

$(".game-case").click(function() {
    var gameCase = document.getElementById(this.id);
    if (playerTurn && choosenSymbol !== "" && boardGame[this.id] === 0 && endGame === false) {
        var gameCaseSymbol = document.createElement('i');
        gameCaseSymbol.className = "fas fa-" + choosenSymbol;
        
        var gameCaseP = document.createElement('p');
        gameCaseP.className = "text-center display-1";
        gameCaseP.appendChild(gameCaseSymbol);
        gameCase.appendChild(gameCaseP);
        boardGame[this.id] = 1;
        playerTurn = false;
        player = 0;
        testVictory();
        ComputerPlay();
    }
});

function playGame() {
    var bingo = Math.floor(Math.random()*100);
    if (bingo <= 50) {
        player = 0;
        playerTurn = false;
        ComputerPlay();
    } else {
        player = 1;
        playerTurn = true;
        $("#player-turn").show(800);
        $("#computer-turn").hide(800);
    }
}

function ComputerPlay() {
        if (!endGame) {
                $("#computer-turn").show(800);
                $("#player-turn").hide(800);
                setTimeout(function() {
                        var chooseCase = false;
                        while(!chooseCase) {
                                var rand = Math.floor(Math.random() * boardGame.length);
                                
                                if (boardGame[rand] === 0) {
                                        var gameCase = document.getElementById(rand);
                                        var gameCaseSymbol = document.createElement('i');
                                        gameCaseSymbol.className = "fas fa-" + otherSymbol;
                
                                        var gameCaseP = document.createElement('p');
                                        gameCaseP.className = "text-center display-1";
                
                                        gameCaseP.appendChild(gameCaseSymbol);
                                        gameCase.appendChild(gameCaseP);
                
                                        boardGame[rand] = 2;
                                        
                                        chooseCase = true;
                                        playerTurn = true;
                                        player = 1;
                                        
                                }
                        }
                        testVictory();
                        if (!endGame) {
                        $("#player-turn").show(800);
                        $("#computer-turn").hide(800);
                        }
                },3000);
        }
}

function arraysEqual(a, b,c) {
        var tester = a.slice();
        for (var j = 0; j < tester.length; ++j) {
                if ((c === 1 && tester[j] === 1) || b[j] === 0) { tester[j] = 0;} else if ((c === 2 && tester[j] === 2) || b[j] === 0) { tester[j] = 0;}
        }
        for (var i = 0; i < tester.length; ++i) {
                if ((c === 1) && (tester[i] === 1)) { tester[i] = 0;} else if ((c === 2) && (tester[i] === 2)) { tester[i] = 0;} 
                if ((tester[i] !== b[i])) return false;
        }
        return true;
}

function testVictory() {
        for (var i = 0; i < winBoard.length; ++i) {
                var resultA = arraysEqual(boardGame,winBoard[i],2);
                if (resultA) {
                        endGame = true;
                        endTheGame("victory");
                }
        }
        for (var j = 0; j < loseBoard.length; ++j) {
                var resultB = arraysEqual(boardGame,loseBoard[j],1);
                if (resultB) {
                        endGame = true;
                        endTheGame("lose");
                }
        }
        var equal = 0;
        for (var k = 0; k < boardGame.length; ++k) {
                if (boardGame[k] !== 0) {
                        equal++;
                }
        }
        if (equal === boardGame.length && !endGame) {
                endTheGame("equal");
        }
}

function endTheGame(result) {
        $("#player-turn").hide(800);
        $("#computer-turn").hide(800);
        if (result == "victory") {
            var alertStyle = "alert-success";
            var alertText = "You win";
        } else if (result == "lose") {
            var alertStyle = "alert-danger";
            var alertText = "You lose !!";
        } else if (result == "equal") {
            var alertStyle = "alert-warning";
            var alertText = "Draw game !!";
        }
        var z = document.getElementById("end-game");
        if (z.classList[alertStyle]) {z.classList.remove(alertStyle);}
        z.classList.add(alertStyle);
        z.innerText = alertText;
        $("#end-game").show(800);
}

$("#restart").click(function() {
    choosenSymbol = "";
    otherSymbol = "";
    playerTurn = false;
    player = 0;
    endGame = false;
    boardGame = [0,0,0,0,0,0,0,0,0];
    $("#player-turn").hide();
    $("#computer-turn").hide();
    $("#end-game").hide();
    for (var i = 0; i< 9; i++) {
        var gameCase = document.getElementById(i);
        if (gameCase.firstChild) {
            gameCase.removeChild(gameCase.firstChild);
        }
    }
    var startButton = document.getElementById("start-game");
    startButton.disabled = false;
});