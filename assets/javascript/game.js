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
    "Victory",
    "Yamaha"
];
var lettersGussed = [];
var keypress = "";
var wordString = "";
var wordLettersArray = [];
var hiddenWord = "";

// Where the magic happens
document.onkeyup = function(event) { 
    keypress = event.key;
    if (!(isLetter(keypress))){
        console.log("false");
        document.getElementById('messageBoard').textContent = "That is not a letter. Try again.";
        return;
    }
    else {
        document.getElementById('messageBoard').textContent = "Guess another letter.";
        writeGuess(keypress);
    }


}
// Functions
// Check if input is a letter
function writeGuess(keypress){
    if (lettersGussed.indexOf(keypress) !== -1){
        document.getElementById('messageBoard').textContent = "You already gussed that. Try again.";
        return;
    } else if (1 == 1) {
        lettersGussed.push(keypress); //lettersGuessed
        var gussedStr = lettersGussed.join(", ")
        document.getElementById('lettersGuessed').textContent = gussedStr;
        console.log("else if");
    }
}
function isLetter(str){
    str = str.toLowerCase();
    return str.length === 1 && str.match(/[a-z]/i);
}
function selectRandomWord(wordArray) {
    var selectedWord = Math.floor(((Math.random()) * wordArray.length));
    wordString = wordList[selectedWord].toLowerCase();
    return wordString;
};
function word2Array(motoBrand) {
    wordLettersArray = motoBrand.split("");
    return wordLettersArray;
};
function blankSpaces(lettersArray) {
    var hiddenArray = [];
    for (i = 0; i < lettersArray.length; i++) {
        hiddenArray.push("_")
        console.log(hiddenArray);
    }
    hiddenWord = hiddenArray.join(" ");
    document.getElementById('hiddenWord').textContent = hiddenWord;
};


console.log(selectRandomWord(wordList));
console.log(wordString);
console.log(word2Array(wordString));
console.log(wordLettersArray);
blankSpaces(wordLettersArray);
console.log(hiddenWord);