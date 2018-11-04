//login function when clicked
accountLoginBtn.click(()=>{
	app.auth().signInWithEmailAndPassword(emailInput.val(), passwordInput.val()).catch(function(error) {
		if (error.code === 'auth/wrong-password') {
			alert('Wrong password.');
		} else if(error.code === 'auth/invalid-email'){
			alert('Email already in use.');
		} else if(error.code === 'auth/user-not-found'){
			alert('User not found');
			passwordInput.val('');
		} else {
			console.log(error.code, error.message);
		}
	});
});

//signup function when clicked
accountSignupBtn.click(()=>{
	app.auth().createUserWithEmailAndPassword(emailInput.val(), passwordInput.val()).catch(function(error) {
		if (error.code === 'auth/wrong-password') {
			alert('Wrong password.');
		} else if(error.code === 'auth/invalid-email'){
			alert('Email already in use.');
		} else if(error.code === 'auth/user-not-found'){
			alert('User not found');
			passwordInput.val('');
		} else {
			alert(error.message);
		}
	});
});