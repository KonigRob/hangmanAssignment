//The user uses the controller, which manipulates the model

//adds click functions onto the letters
function addLetterClick(){
	for(let i = 0; i < alphabetArray.length; ++i){
		$('#'+alphabetArray[i]).click(function(){
			letterClick(alphabetArray[i])
		});
	}
}

//restarts the Game
function restartGame(){
	if(limit < 7){
		clearTimeout(nextGameCountdown);
		limit = 6;
		count = 0;
		amountOfLetterInWord = wordsToGuess[whichWord].length;
		// resetScore();
		resetAttempts();
		showAlphabet();
		resetUnderscore();
		isGameRunning = true;
	}
}

//starts the Game
function startGame(){
	if(!isGameRunning){
		restart.show();
		scoreText.show();
		hint.show();
		clearTimeout(nextGameCountdown);
		limit = 6;
		count = 0;
		setDescription(whichWord);
		resetScore();
		resetAttempts();
		addAlphabet();
		addLetterClick();
		resetUnderscore();
		isGameRunning = true;
	}
}

//detects if the letter you've clicked is in the word or not
function letterClick(letter){
	console.log(wordsToGuess);
	if(wordsToGuess[whichWord].includes(letter)){
		console.log("You picked right!");
		loopAndReplace(letter);
	} else if(!limit){
		decreaseAttempts();
		console.log("you have lost!");
		gameOver(endArray[0]);
	} else{
		decreaseScore();
		decreaseAttempts();
		console.log("You picked wrong!");
		limit -= 1;
	}
	hideLetter(letter);
}

//adds the clicker to the start button
start.click(function(){
	startGame();
	start.hide();
});

//adds the clicker to the restart button
restart.click(function(){
	restartGame();
});

letterSortBtn.click(()=>{
	wordList.empty();
	grabWords(wordList, "letterCount");
});

ratingSortBtn.click(()=>{
	wordList.empty();
	grabWords(wordList, "rating");
});

