//The model updates the view

let wordsToGuess = [];
let descripArray = [];
let wordRating = 0;

// id's of the html
const word = $('#word'), descrip = $('#descrip'), buttonHolder = $('#lettersBtns'), score = $('#score'), restart = $('#restart'),
	start = $('#start'), attempts = $('#attemptsLeft'), scoreText = $('#scoreText'), hint = $('#hint');
let endArray = ['You have lost!', 'You have won with a score of '];
let whichWord = 0;
let alphabetArray = [];
let amountOfLetterInWord = 0;
let count = 0;
let limit = 6;
let isGameRunning = false;
let nextGameCountdown;

for (let i = 0; i < 26; ++i) {
	alphabetArray[i] = String.fromCharCode(i + 97);
}

//new stuff
let config = {
	apiKey: "AIzaSyC-YbO2DEdvN7aOn3i-rNKsWGp-dpeGF50",
	authDomain: "hangman-1af01.firebaseapp.com",
	databaseURL: "https://hangman-1af01.firebaseio.com",
	projectId: "hangman-1af01",
	storageBucket: "hangman-1af01.appspot.com",
	messagingSenderId: "388026978967"
};
let app = firebase.initializeApp(config);
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);
const functions = firebase.functions();

let accountText = $('#accountText');
let account = $('#account');
let signout = $('#signout');
let login = $('#login');

//Account signup
let accountLoginBtn = $('#accountLoginBtn');
let accountSignupBtn = $('#accountSignupBtn');
let emailInput = $('#emailInput');
let passwordInput = $('#passwordInput');

//index
let wordList= $('#wordList');
let letterSortBtn = $('#letterSortBtn');
let ratingSortBtn = $('#ratingSortBtn');
let adminBtn = $('#adminBtn');