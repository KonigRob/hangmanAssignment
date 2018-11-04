const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.whoAmI = functions.https.onCall((data) => {
	console.log("Is: ", data.uid, " an admin?: ", data.uid === "Zv9bXrRJcaQd1GwgHEXRYczilQx1");
	return {
		you: data.uid === "Zv9bXrRJcaQd1GwgHEXRYczilQx1",
		site: "admin.html"};
});

exports.firstScore = functions.firestore.document('words/{wordId}/firstScore/{userId}').onCreate((snap, context)=>{
	let dataRef = admin.firestore().collection('users').doc(snap.id);
	return dataRef.get().then((result)=>{
		let addedFirstScore = parseInt(result.data().firstScore) + parseInt(snap.data().firstScore);
		return dataRef.update({
			firstScore:addedFirstScore,
			gamesPlayed:parseInt(result.data().gamesPlayed) + 1
		}).catch((e)=>{
			console.log(e)
		});
	}).catch((e)=>{
		console.log(e)
	});
});