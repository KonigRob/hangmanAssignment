app.auth().onAuthStateChanged((user)=>{
	if(user){
		account.show();
		accountText.text(getUserName(user));
		signout.show();
		login.hide();
	} else {
		account.hide();
		signout.hide();
		login.show();
	}
	grabWords(wordList);
});

function getUserName(user){
	if(user.displayName === null){
		return user.email;
	} else {
		return user.displayName;
	}
}

function grabWords(wordList){
	let j = 0;
	db.collection("words").get().then((result)=>{
		result.forEach((doc)=>{
			const i = j;
			wordList.append('<div><p class="d-inline" style="padding-right:10px;">Letters: '+doc.data().letterCount+' Rating: '+doc.data().rating+'</p>' +
				'<button class="btn btn-primary" id="word'+i+'" type="button">Start</button></div><br>');
			$('#word'+i).click(()=>{
				test(doc);
				// window.location = 'Game.html';
			});
			j++;
		});
	});
}

function test(i){
	console.log(i.data().description);
	wordsToGuess = [];
	descripArray = [];
	wordsToGuess.push(i.data().word);
	descripArray.push(i.data().description);
	wordRating = i.data().rating;
	amountOfLetterInWord = i.data().letterCount;
	console.log(wordRating);
	startGame();
	wordList.hide();
}

//The view is what the user sees

//Adds the images of the alphabet on the div
function addAlphabet() {
	for(let i = alphabetArray.length - 1; i >= 0; --i){
		if(i === 13){
			buttonHolder.prepend('<br><img id="'+alphabetArray[i]+'" src="images/letters/'+alphabetArray[i]+'.png" class="img-fuild" style="width: 50px; margin-right: 10px" />');
		} else{
			buttonHolder.prepend('<img id="'+alphabetArray[i]+'" src="images/letters/'+alphabetArray[i]+'.png" class="img-fuild" style="width: 50px; margin-right: 10px" />');
		}
	}
}

//Sets all the images for the alphabet to show again
function showAlphabet(){
	for(let i = 0; i < alphabetArray.length; ++i){
		$('#'+alphabetArray[i]).show();
	}
}

//empties the div and re-adds the underscores
function resetUnderscore(){
	word.empty();
	addUnderscore();
}

//adds underscores based on how long the word is
function addUnderscore(){
	for(let i = wordsToGuess[0].length - 1; i >= 0 ; --i){
		word.prepend('<img class="blankLetter'+wordsToGuess[0][i]+'" src="images/blank/blank2.png" class="img-fluid" style="width: 60px;"/>');
	}
	word.append('<br><br><br><br><br><br>')
}

//increases the score by 1
function increaseScore() {
	score.text(parseInt(score.text()) + 1);
}

//decreases the score by 1
function decreaseScore(){
	score.text(parseInt(score.text()) - 1);
}

//decreases the shown number of attempts by 1
function decreaseAttempts(){
	attempts.text(parseInt(attempts.text()) -1);
}

function setDescription(number){
	descrip.text(descripArray[number]);
}

//resets the shown score to 0
function resetScore(){
	score.text(0);
}

//resets the shown number of attempts to 7
function resetAttempts(){
	attempts.text(7);
}

//hides the alphabet letter based
function hideLetter(letter){
	$('#'+letter).hide();
}

//loops through the word that is being guessed, and replaces the characters that were guessed correctly.
//Also checks if it needs to start a new Game based on how many correct letters there are vs the length
function loopAndReplace(letter){
	const theWord = wordsToGuess[whichWord];
	for(let i = 0; i < theWord.length; ++i){
		if(theWord[i] === letter){
			count += 1;
			$('.blankLetter'+letter).attr('src', 'images/letters/'+letter+'.png');
			increaseScore();
		}
	}
	if(count === amountOfLetterInWord){
		let message = endArray[1] + "<b>" +parseInt(score.text()) + "</b>! Your word was: <b>" + wordsToGuess[whichWord] + "</b>";
		gameOver(message);
	}
}

//ends the Game, and outputs a message
function gameOver(message) {
	wordList.show();
	descrip.text('');
	isGameRunning = false;
	start.show();
	hint.hide();
	scoreText.hide();
	restart.hide();
	word.empty();
	buttonHolder.empty();
	word.prepend(message);
}

function giveRating(rating){
	db.collection("words").doc(wordsToGuess[0]).update({
		rating:rating,
	}).catch((e)=>{console.log(e)});

}

