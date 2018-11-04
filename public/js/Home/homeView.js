//changes displays based on who is logged in
app.auth().onAuthStateChanged((user)=>{
	if(user){
		currentUser = user.uid;
		account.show();
		accountText.text(getUserName(user));
		signout.show();
		login.hide();
		isAdmin(user);
		addUser(user);
	} else {
		account.hide();
		signout.hide();
		login.show();
	}
	grabWords(wordList, "rating");
});

//grabs the username/email from firebase
function getUserName(user){
	if(user.displayName === null){
		return user.email;
	} else {
		return user.displayName;
	}
}

//grabs the words from firebase
function grabWords(wordList, type){
	let j = 0;
	let wayToOrder;
	if(wordListOrder === 1){
		wordListOrder = 0;
		wayToOrder = db.collection("words").orderBy(type, "desc").get();
	} else {
		wordListOrder = 1;
		wayToOrder = db.collection("words").orderBy(type).get();
	}
	wayToOrder.then((result)=>{
		result.forEach((doc)=>{
			const i = j;
			wordList.append('<div><p class="d-inline" style="padding-right:10px;">Letters: '+doc.data().letterCount+' Rating: '+doc.data().rating+'</p>' +
				'<button class="btn btn-primary" id="word'+i+'" type="button">Start</button></div><br>');
			$('#word'+i).click(()=>{
				loadWord(doc);
				// window.location = 'Game.html';
			});
			j++;
		});
	});
}

//loads the words from firebase into the program
function loadWord(word){
	console.log(word.data().description);
	wordsToGuess = [];
	descripArray = [];
	wordsToGuess.push(word.data().word);
	descripArray.push(word.data().description);
	wordRating = word.data().rating;
	amountOfLetterInWord = word.data().letterCount;
	gamesList.hide();
	wordList.hide();
	startGame();


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

//Sets the description
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
		console.log("you've won! with a score of ", score.text());
		// firstScore(parseInt(score.text()));
		// afterScores(parseInt(score.text()));
		// checkUser(score.text());
		let message = endArray[1] + "<b>" +parseInt(score.text()) + "</b>! Your word was: <b>" + wordsToGuess[whichWord] + "</b>";
		gameOver(message);
	}
}

//ends the Game, and outputs a message
function gameOver(message) {
	firstScore(parseInt(score.text()));
	gamesList.show();
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

// function giveRating(rating){
// 	db.collection("words").doc(wordsToGuess[0]).update({
// 		rating:rating,
// 	}).catch((e)=>{console.log(e)});
// }

//detects if the user is an admin
function isAdmin(user){
	let whoAmI = functions.httpsCallable('whoAmI');
	whoAmI({uid:user.uid}).then((result)=>{
		console.log("This is an admin account?: ", result.data.you);
		if (result.data.you === true) {
			adminBtn.attr('href', result.data.site);
			adminBtn.show();
		}
	});
}

