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
				window.location = 'game.html';
			});
			j++;
		});
	});
}

function test(i){
	console.log(i.data().description);
	wordsToGuess.push(i.data().word);
	descripArray.push(i.data().description);
	amountOfLetterInWord = i.data().letterCount;
	console.log(amountOfLetterInWord);
	// startGame();
}

