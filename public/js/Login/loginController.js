//If there is a user logged in, redirect the page
app.auth().onAuthStateChanged((user)=>{
	if(user){
		window.location = 'index.html';
	}
});