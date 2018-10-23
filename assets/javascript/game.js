// Variables
// Word List
var wordList = [
    "Aprilia",
    "BMW",
    "Buell",
    "Ducati",
    "Harley",
    "Honda",
    "Husqvarna",
    "Hyosung",
    "Indian",
    "Kawasaki",
    "KTM",
    "Suzuki",
    "Triumph",
    "Ural",
    "Vespa",
    "Victory",
    "Yamaha",
    "Zero"
];
var wordString = "";
var wordLettersArray = [];
// Sound locations object
var sound = {
    "wrong" : {
      src : "assets/sounds/GotItWrong_MotoSkid.mp3"
    },
    "right" : {
      src : "assets/sounds/GotItRight_MotoPass.mp3"
    },
    "start" : {
      src: "assets/sounds/StartGame_MotoStart.mp3"
    },
    "winning" : {
      src : "assets/sounds/WinGame_MotoRaceEnd.mp3"
    },
    "losing" : {
      src : "assets/sounds/LoseGame_MotoCrashBurn.mp3"
    },
    "repeat" : {
        src : "assets/sounds/RepeatLetter_MotoHorn.mp3"
      },
    "error" : {
        src: "assets/sounds/Error_MotoHorn.mp3"
    }
  };
// Boardstate messages
var boardState = {
    pressToStart: "Press SPACEBAR to start your engine!",
    notSpacebar: "That is not Spacebar; try again!",
    pressToGo: "Guess any letter key to GO!",
    notALetter: "That is not a letter. Try again.",
    // alreadyGussed: "You already had that one! Guess another letter.",
    alreadyGussed: "You already tried that one! Guess another letter.",
    gotIt: "Great you got that one! Guess another letter.",
    missedIt: "Oops Missed that one! Guess another letter.",
    gameOver: "Tank ran out of fuel; you crashed and burned. Press SPACEBAR to repair and fuel up for the next race.",
    winGame: "CONGRATULATIONS!!! You won your race! Press SPACEBAR to fuel up and race again.",
    alreadyMissed: "You tried that and missed already! Guess another letter."
};
// Score and tallies
var state = {
    active: false,
    gameOver: false
};
var wins = 0;
writeWins(wins);
var guessesLeft = 10;
writeGussesLeft(guessesLeft);
var lettersGussed = [];
var keypress = "";
var hiddenArray = [];
var hiddenWord = "";
writeToScreen(boardState.pressToStart);
// console.log("state active: " + state.active);
document.onkeyup = function(event) { 
    keypress = event.key ;
    // Checking user inputs and activating gameplay
    if (keypress != " " && (!(state.active))) { 
        writeToScreen(boardState.notSpacebar);
        playSound(sound.error.src);
        return;
    } 
    else if (!(state.active)) {
            state.active = true;
            state.gameOver = false;
            nextGame();
            // console.log("state active: " + state.active);
            playSound(sound.start.src);
            return;
    }
    else if (!(isLetter(keypress))) {
        writeToScreen(boardState.notALetter);
        playSound(sound.error.src);
        // console.log(keypress);
        return;
    }
    if (wordLettersArray.indexOf(keypress) !== -1) { // If letter exists in the wordLettersArray continue
        var index = "";
        index = wordLettersArray.indexOf(keypress);   // Find corresponding index for matching keypress
        for (i = index; i < hiddenArray.length; i++) { // Look for every spot that matches keypress in wordsLetterArray
            if (wordLettersArray[i] == keypress) { // When match is found replace the corresponding index item in hiddenArray
                hiddenArray[i] = keypress;
                fillSpaces(hiddenArray);  // Use fillSpaces to joing hiddenArray items into a single string and display to user
            };
        };
        if (countInArray(hiddenArray, keypress) >= 1) { // If item hasn't been guessed before show got it message
            writeToScreen(boardState.gotIt);
            if ((writeGuess(keypress))) {
                playSound(sound.right.src);
            };
        };
    }
    else {
        // console.log(guessesLeft);
        if ((lettersGussed.indexOf(keypress) == -1) && (guessesLeft > 0)) {
            guessesLeft--;
            writeGussesLeft(guessesLeft);
            writeToScreen(boardState.missedIt);
            playSound(sound.wrong.src);
            writeGuess(keypress);
        }
        else {
            writeGuess(keypress);
        };

    };
};
// Functions
// Functions for displaying content to user
function writeToScreen(boardState) { // Write message on jumbotron
    document.getElementById('messageBoard').textContent = boardState;
};
function writeGussesLeft(guess) { // Display guess remainder (fuel)
    document.getElementById('guessCount').textContent = guessesLeft + "0%";
};
function writeWins(win) { // Display number of wins
    document.getElementById('winCount').textContent = wins;
};
// Setup and start gameboard
function nextGame() {
    hiddenArray = [];
    hiddenWord = "";
    guessesLeft = 10;
    lettersGussed = [];
    document.getElementById('lettersGuessed').textContent = "";
    writeToScreen(boardState.pressToGo);
    writeGussesLeft(guessesLeft);
    writeWins(wins);
    selectRandomWord(wordList);
    // console.log(wordString);
};
// Select a word randomly from word list array
function selectRandomWord(wordArray) {
    var selectedWord = Math.floor(((Math.random()) * wordArray.length));
    wordString = wordList[selectedWord].toLowerCase();
    word2Array(wordString);
    blankSpaces(wordLettersArray);
    return wordString;
};
//Convert randomly selected word to array of letters
function word2Array(motoBrand) {
    wordLettersArray = motoBrand.split("");
    return wordLettersArray;
};
// Put down placeholders for word on the gameboard
function blankSpaces(lettersArray) {
    for (i = 0; i < lettersArray.length; i++) {
        hiddenArray.push("_");
        fillSpaces (hiddenArray);
    }; 
};
// Check if input is a letter
function isLetter(str){
    str = str.toLowerCase();
    return str.length === 1 && str.match(/[a-z]/i);
};
// Create list of gussed letters and check if won or lost
function writeGuess(keypress){
    function writeIt(keypress) { // Record the keypress on screen 
        lettersGussed.push(keypress);
        var gussedStr = lettersGussed.join(", ")
        document.getElementById('lettersGuessed').textContent = gussedStr.toLocaleUpperCase();
    };
    if (((hiddenArray.indexOf('_') == -1)) && (state.active)) {
        wins++;
        state.active = false;
        state.gameOver = true;
        writeWins(wins);
        writeToScreen(boardState.winGame);
        playSound(sound.winning.src);
        writeIt(keypress);
        // console.log(wins);     
    }
    else if ((guessesLeft == 0) && state.active) {
        state.active = false;
        state.gameOver = true;
        writeToScreen(boardState.gameOver);
        playSound(sound.losing.src);
        writeIt(keypress);
        guessesLeft = "";
        writeGussesLeft(guessesLeft);
    }
    else if (lettersGussed.indexOf(keypress) !== -1){
        writeToScreen(boardState.alreadyGussed);
        playSound(sound.repeat.src);
        // console.log("writeGuess already guessed")
        return false;
    }
    else {
        writeIt(keypress);
        // console.log(hiddenArray.indexOf("_"));
        return true;
    };
};
// Joing hiddenArray items into a single string seperated by spaces and display to user
function fillSpaces(hiddenArray) {
    hiddenWord = hiddenArray.join(" ");
    document.getElementById('hiddenWord').textContent = hiddenWord.toLocaleUpperCase();
};
// Check if item shows up more than once
function countInArray(array, letter) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {localStorage
        if (array[i] === letter) {
            count++;
        };
    };
    // console.log("countInArray is: " + count );
    return count;
};
// Play game sounds
function playSound(src){
    var audio = document.createElement('audio');
    audio.style.display = "none";
    audio.src = src;
    // audio.autoplay = true;
    // console.log(audio);
    audio.play();
    audio.onended = function(){
      audio.remove(); //Remove when played.
    };
    document.body.appendChild(audio);
};

  // OSK Gen Not used yet. For future to allow for mobile play
//   $(document).ready(function() {
//     // Here we are provided an initial array of letters.
//     // Use this array to dynamically create buttons on the screen.
//     var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " "];
//     for (var i = 0; i < letters.length - 1; i++) {
//         var letterBtn = $('<button>');
//         letterBtn
//             .addClass("letter-button letter letter-button-color")
//             .attr("data-letter", letters[i])
//             .text(letters[i]);
//         $("#buttons").append(letterBtn);
//     }
//     var spaceBtn = $('<button>');
//     spaceBtn
//         .addClass("letter-button letter-button-color space")
//         .attr("data-letter", letters[letters.length])
//         .text("SPACEBAR");
//     $("#buttons").append(spaceBtn);
//     $(".letter-button").on("click", function() {
//     var fridgeMagnet = $('<div>');
//         for (var i = 0; i < letters.length; i++) {
//             fridgeMagnet.addClass("letter fridge-color")
//             .text($(this)
//             .attr("data-letter"))
//             $("#display").append(fridgeMagnet);
//         }
//     console.log(fridgeMagnet);
//     });
//         $("#clear").on("click", function() {
//             var fridgeMagnet = $('#display');
//             fridgeMagnet.empty();
//         });
//     });