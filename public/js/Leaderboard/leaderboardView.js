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
	grabWords(highScoreList, "highScore");
	grabWords(firstPlayList, "firstScore");
});

//grabs the email or display name to firebase, depending on what is set
function getUserName(user){
	if(user.displayName === null){
		return user.email;
	} else {
		return user.displayName;
	}
}

//detects if the user is an admin.  This function was not impletmented in time.  But wouldn't take long.
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

//grabs the data from firebase and populates it to the page
function grabWords(wordList, type){
	let wayToOrder;
	if(wordListOrder === 1){
		wordListOrder = 0;
		wayToOrder = db.collection("users").orderBy(type, "desc").get();
	} else {
		wordListOrder = 1;
		wayToOrder = db.collection("users").orderBy(type).get();
	}
	wayToOrder.then((result)=>{
		result.forEach((doc)=>{
			wordList.append('<div><p class="d-inline ml-3">'+doc.data().email+'</p><p class="d-inline float-right mr-3">Score: '+doc.data().highScore+' | Games played: '+doc.data().gamesPlayed+'</p></div>');
		});
	});
}