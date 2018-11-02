const functions = require('firebase-functions');

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