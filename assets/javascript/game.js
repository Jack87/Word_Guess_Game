// Variables
var wins = 0;
var gussesLeft = 15;
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
var lettersGussed = [];
var keypress = "";
var wordString = "";
var wordLettersArray = [];
var hiddenArray = [];
var hiddenWord = "";

// Where the magic happens
startGame();
console.log(wordString);
document.onkeyup = function(event) { 
    keypress = event.key;
    if (!(isLetter(keypress))){
        console.log("false");
        document.getElementById('messageBoard').textContent = "That is not a letter. Try again.";
        return;
    }
    else {
    }
    if (wordLettersArray.indexOf(keypress) !== -1) {
        var index = "";
        index = wordLettersArray.indexOf(keypress);
        for (i = index; i < hiddenArray.length; i++) {
            if (wordLettersArray[i] == keypress) {
                hiddenArray[i] = keypress;
                fillSpaces(hiddenArray); 
            }
        }
        if (countInArray(hiddenArray, keypress) > 1) {
            document.getElementById('messageBoard').textContent = "Great you got that one! Guess another letter.";
        } else if ((wordLettersArray[index] == hiddenArray[index]) && lettersGussed.indexOf(hiddenArray[index]) > -1) { //working on here
            document.getElementById('messageBoard').textContent = "You already had that one! Guess another letter.";
        } else {
            document.getElementById('messageBoard').textContent = "Great you got that one! Guess another letter.";
        }
        writeGuess(keypress);
    } else {
        console.log(gussesLeft);
        if ((lettersGussed.indexOf(keypress) == -1) && (gussesLeft > 0)) {
            gussesLeft--;
            document.getElementById('guessCount').textContent = gussesLeft;
            document.getElementById('messageBoard').textContent = "Oops Missed that one! Guess another letter.";
            writeGuess(keypress);
            console.log("this");

        }
    } 
}

// Functions
// Setup and start gameboard
function startGame(){
    document.getElementById('messageBoard').textContent = "Press any letter key to start the game!";
    document.getElementById('guessCount').textContent = gussesLeft;
    document.getElementById('winCount').textContent = wins;
    selectRandomWord(wordList);
}
// Select a word randomly from list
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
    } 
};
// Check if input is a letter
function isLetter(str){
    str = str.toLowerCase();
    return str.length === 1 && str.match(/[a-z]/i);
}
// Hold already gussed letters
function writeGuess(keypress){
    if (lettersGussed.indexOf(keypress) !== -1){
        document.getElementById('messageBoard').textContent = "You already gussed that. Try again.";
        return;
    } else {
        lettersGussed.push(keypress);
        var gussedStr = lettersGussed.join(", ")
        document.getElementById('lettersGuessed').textContent = gussedStr;
    }
}
function fillSpaces(hiddenArray) {
    hiddenWord = hiddenArray.join(" ");
    document.getElementById('hiddenWord').textContent = hiddenWord;
};
// check if item shows up more than once
function countInArray(array, letter) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {localStorage
        if (array[i] === letter) {
            count++;
        }
    }
    return count;
}