//The user uses the controller, which manipulates the model

//adds click functions onto the letters
function addLetterClick(){
	for(let i = 0; i < alphabetArray.length; ++i){
		$('#'+alphabetArray[i]).click(()=>{
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
		firstScore(parseInt(score.text()));
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

//sets the firstscore in the db
function setFirstScore(score){
	db.collection('words').doc(wordsToGuess[0]).collection('firstScore').doc(currentUser).set({
		firstScore: score
	}).catch((e) => {
		console.log(e);
	});
}

//sets the first highscore in the db
function setHighScore(score){
	db.collection('words').doc(wordsToGuess[0]).collection('highScores').doc(currentUser).set({
		highScores: score
	}).catch((e) => {
		console.log(e);
	});
}

//sets the first total score
function setTotalScore(score){
	db.collection('users').doc(currentUser).get().then((userResult)=>{
		db.collection('users').doc(currentUser).update({
			highScore: userResult.data().highScore + score
		});
	})
}

//adds the scores
function firstScore(score){
	if(currentUser !== "none") {
		db.collection('words').doc(wordsToGuess[0]).collection('firstScore').doc(currentUser).get().then((result) => {
			if (!result.exists) {
				setFirstScore(score);
				setHighScore(score);
				setTotalScore(score);
			}
		}).then(()=>{
			highScore(score);
		});
	}
}

//detects if there is a highscore, and if so, adds it into the db
function highScore(newScore){
	db.collection('words').doc(wordsToGuess[0]).collection('highScores').doc(currentUser).get().then((oldScore) => {
		if(oldScore.data().highScore < newScore){
			let userRef = db.collection('users').doc(currentUser);
			userRef.get().then((userCurrentScore)=>{
				userRef.update({
					highScore: userCurrentScore.data().highScore + newScore - oldScore.data().highScore
				}).then(()=>{
					db.collection('words').doc(wordsToGuess[0]).collection('highScores').doc(currentUser).update({
						highScore: newScore
					}).catch((e) => {
						console.log(e);
					});
				});
			});
		}
	});
}

//Adds the user to the system on load
function addUser(user){
	db.collection('users').doc(user.uid).get().then((result)=>{
		if(!result.exists) {
			db.collection('users').doc(user.uid).set({
				email: user.email,
				firstScore:0,
				highScore:0,
				gamesPlayed: 0
			}).catch((e)=>{console.log(e);});
		}
	}).catch((e)=>{console.log(e);});
}

//adds the clicker to the start button
start.click(()=>{
	startGame();
	start.hide();
});

//adds the clicker to the restart button
restart.click(()=>{
	restartGame();
});

//sorts by amount of letters
letterSortBtn.click(()=>{
	wordList.empty();
	grabWords(wordList, "letterCount");
});

//sorts by rating
ratingSortBtn.click(()=>{
	wordList.empty();
	grabWords(wordList, "rating");
});

