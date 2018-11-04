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

//sorts the highScore on click
highScoreSortBtn.click(()=>{
	highScoreList.empty();
	grabWords(highScoreList, "highScore")
});

//sorts the firstScore on click
firstPlaySortBtn.click(()=>{
	firstPlayList.empty();
	grabWords(firstPlayList, "firstScore")
});