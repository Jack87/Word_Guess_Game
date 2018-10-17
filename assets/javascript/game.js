// window.onload = function() {
//     initialize();
//   };
// function initialize() {
// Variables
// Word List
var wordList = [
    "Aprilia",
    "BMW",
    "Ducati",
    "Harley",
    "Honda",
    "Kawasaki",
    "KTM",
    "Suzuki",
    "Triumph",
    "Victory",
    "Yamaha"
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
      }
  };
// Boardstate messages
var boardState = {
    pressToStart: "Press SPACEBAR to start your engine!",
    notSpacebar: "That is not Spacebar; try again!",
    pressToGo: "Guess any letter key to GO!",
    notALetter: "That is not a letter. Try again.",
    alreadyGussed: "You already had that one! Guess another letter.",
    gotIt: "Great you got that one! Guess another letter.",
    missedIt: "Oops Missed that one! Guess another letter.",
    gameOver: "Tank ran out of fuel; you crashed and burned. Press SPACEBAR to repair and fuel up for the next race.",
    winGame: "CONGRADULATIONS!!! You won your race! Press SPACEBAR to fuel up and race again."
    
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
// };
//    playSound(sound.start.url);
// Functions for displaying content to user
function writeToScreen(boardState) {
    document.getElementById('messageBoard').textContent = boardState;
}
function writeGussesLeft(guess) {
    document.getElementById('guessCount').textContent = guessesLeft + "0%";
}
function writeWins(win) {
    document.getElementById('winCount').textContent = wins;
}

function nextGame() {
    writeToScreen(boardState.pressToGo);
    writeGussesLeft(guessesLeft);
    writeWins(wins);
    selectRandomWord(wordList);
    console.log(wordString);
}
console.log("state active: " + state.active);
document.onkeyup = function(event) { 
    keypress = event.key ;
    // Checking user inputs and activating gameplay
    if (keypress != " " && (!(state.active))) { 
        writeToScreen(boardState.notSpacebar);
        return;
    } else if (!(state.active)) {
            state.active = true;
            nextGame();
            console.log("state active: " + state.active);
            playSound(sound.start.src);
            return;
    } 
    else if (!(isLetter(keypress))){
        writeToScreen(boardState.notALetter);
        console.log(keypress);
        return;
    }
    if (wordLettersArray.indexOf(keypress) !== -1) { // If letter exists in the wordLettersArray continue
        var index = "";
        index = wordLettersArray.indexOf(keypress);   // Find corresponding index for matching keypress
        for (i = index; i < hiddenArray.length; i++) { // Look for every spot that matches keypress in wordsLetterArray
            if (wordLettersArray[i] == keypress) { // When match is found replace the corresponding index item in hiddenArray
                hiddenArray[i] = keypress;
                fillSpaces(hiddenArray);  // Use fillSpaces to joing hiddenArray items into a single string and display to user
            }
        }
        if (countInArray(hiddenArray, keypress) >= 1) { // If item hasn't been gussed before show got it message
            writeToScreen(boardState.gotIt);
            if ((writeGuess(keypress))) {
                playSound(sound.right.src);
            }
        } 
    }

    else {
        console.log(guessesLeft);
        if ((lettersGussed.indexOf(keypress) == -1) && (guessesLeft > 0)) {
            guessesLeft--;
            writeGussesLeft(guessesLeft);
            writeToScreen(boardState.missedIt);
            playSound(sound.wrong.src);
            writeGuess(keypress);
            console.log("this");
        }
        else if ((wordLettersArray[index] == hiddenArray[index]) && lettersGussed.indexOf(hiddenArray[index]) > -1) { // If letter has been gussed before (right or wrong) show already gussed message
            writeToScreen(boardState.alreadyGussed);
            console.log("this is happening")
        }
    }
}

// Functions
// Setup and start gameboard

// Select a word randomly from word list array
function selectRandomWord(wordArray) {
    var selectedWord = Math.floor(((Math.random()) * wordArray.length));
    wordString = wordList[selectedWord].toLowerCase();
    word2Array(wordString);
    blankSpaces(wordLettersArray);
    return wordString;
}
//Convert randomly selected word to array of letters
function word2Array(motoBrand) {
    wordLettersArray = motoBrand.split("");
    return wordLettersArray;
}
// Put down placeholders for word on the gameboard
function blankSpaces(lettersArray) {
    for (i = 0; i < lettersArray.length; i++) {
        hiddenArray.push("_");
        fillSpaces (hiddenArray);
    } 
}
// Check if input is a letter
function isLetter(str){
    str = str.toLowerCase();
    return str.length === 1 && str.match(/[a-z]/i);
}
// Hold already gussed letters
function writeGuess(keypress){
    if (lettersGussed.indexOf(keypress) !== -1){
        writeToScreen(boardState.alreadyGussed);
        playSound(sound.repeat.src);
        console.log("writeGuess already gussed")
        return false;
    } else {
        lettersGussed.push(keypress);
        var gussedStr = lettersGussed.join(", ")
        document.getElementById('lettersGuessed').textContent = gussedStr.toLocaleUpperCase();
        return true;
    }
}
// Joing hiddenArray items into a single string seperated by spaces and display to user
function fillSpaces(hiddenArray) {
    hiddenWord = hiddenArray.join(" ");
    document.getElementById('hiddenWord').textContent = hiddenWord.toLocaleUpperCase();
}
// check if item shows up more than once
function countInArray(array, letter) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {localStorage
        if (array[i] === letter) {
            count++;
        }
    }
    console.log("countInArray is: " + count );
    return count;
}
// Play game sounds
function playSound(src){
    var audio = document.createElement('audio');
    audio.style.display = "none";
    audio.src = src;
    // audio.autoplay = true;
    console.log(audio)
    audio.play()
    audio.onended = function(){
      audio.remove() //Remove when played.
    };
    document.body.appendChild(audio);
  }