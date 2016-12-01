// GLOBAL VARIABLES (Accessible by all functions)
//  arrays and variable for holding data
//==================================================================================================



var wordOptions = ["carrot", "celery", "spinach", "kale", "beets", "radish", "broccoli", "asparagus", "avocado"];

var selectedWord = "";

var lettersInWord = [];

var numBlanks = 0;

var blanksAndSuccesses = []; // k _ _ _

var wrongLetters = [];


//Game counters

var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// FUNCTIONS (These are bits of code that we will call upon to run when needed)
// ==================================================================================================
function startGame () {
	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	lettersInWord = selectedWord.split("");
	numBlanks =  lettersInWord.length;

	//Reset
	guessesLeft = 9;
	wrongLetters = [];
	blanksAndSuccesses = [];

	// Populate blanks and successes with right number of blanks
	for (var i=0; i<numBlanks; i++){
		blanksAndSuccesses.push("_");
	}

	//Change HTML to reflect round conditions
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;

	//testing/debugging
	console.log(selectedWord);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
	// check if letter exists in code at all
	

	var isLetterInWord = false;

	for (var i=0; i<numBlanks; i++){
		if(selectedWord[i] == letter) {
			isLetterInWord = true;
			
		}
	}

	//Check where in the word the letter exists, then populate out blanksAndSuccesses array
	if(isLetterInWord) {
		
	for (var i=0; i<numBlanks; i++){
		if(selectedWord[i] == letter){
			blanksAndSuccesses[i] = letter;
		}
	}

}

// letter wasn't found

else {
	wrongLetters.push(letter);
	guessesLeft--
}

	// testing
	console.log(blanksAndSuccesses);

}

function roundComplete(){
	console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left: " + guessesLeft);

	// update the HTML to reflect the most recent count stats
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

	//check if user won
	if (lettersInWord.toString() == blanksAndSuccesses.toString()){
		winCount++;
		alert("You Won. The word was " + selectedWord + ".");


		//update counter in html
		document.getElementById("winCounter").innerHTML = winCount;

		startGame();
	}
	//check if user lost
	else if (guessesLeft == 0){
		lossCount++;
		alert("You Lost");

		//Update the HTML
		document.getElementById("lossCounter").innerHTML = lossCount;

		startGame();
	}
}





// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)
// ==================================================================================================


// Initiates the code the first time
startGame();

// Register keyclicks

document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();


	//Testing/debugging
	console.log(letterGuessed);
}