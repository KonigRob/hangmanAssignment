app.auth().onAuthStateChanged((user)=>{
	if(user){
		console.log(user);
	}
});