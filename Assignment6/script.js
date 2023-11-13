// Element for display
const wordLast = document.getElementById('word-last');
const wordDef = document.getElementById('word-definition');
const wordChain = document.getElementById('word-chain');

// Element for input
const wordButton = document.getElementById('word-button');
const wordInput = document.getElementById('word-input');

// Import dictionary
var wordList = [];

wordButton.addEventListener('click', () => {	
	// Check and place player's word
	let word = wordInput.value.toLowerCase();
	let nextWord = validateWord(word);
	console.log(nextWord);
	if (nextWord){
		placeWord(nextWord);
	}
});

function validateWord(word) {
	// Check if input exists
	if (!word) {
		console.log('there is no input');
		return false;
	}
	
	// Check if such word exists
	let charIndex = word.charCodeAt(0) - 97;
	var wordExists = true;
	fetch('./dictionary_alpha_arrays.json')
	.then(response => response.json())
	.then(dictionary => {
		wordExists = dictionary[charIndex].hasOwnProperty(word);
		console.log(wordExists);
	});
	console.log(wordExists);
	if (!wordExists) {
		console.log('word does not exist');
		return false;
	}
	
	// Check if word has been used
	if (wordList.indexOf(word) != -1) {
		console.log('word already used.');
		return false;
	}
	
	// Check if word's first character matches
	if (wordList.length) {
		let lastWord = wordList[wordList.length - 1];
		let lastCharIndex = lastWord.charCodeAt(lastWord.length - 1) - 97;
		if (charIndex != lastCharIndex) {
			console.log('character never matches');
			return false;
		}
	}
	
	// Everything checked, granted.
	fetch('./dictionary_alpha_arrays.json')
	.then(response => response.json())
	.then(dictionary => {
		wordList.push(word);
		
		wordLast.innerHTML = word;
		wordDef.innerHTML = dictionary[charIndex][word];
		wordChain.innerHTML = wordList.join(" - ");
		wordInput.value = '';
	});
	
	return word;
}

// sleep function
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// function for computer
async function placeWord(word) {
	console.log('placeword init');
	// First, disable input
	wordInput.disabled = true;
	wordButton.disabled = true;
	
	// Find appropriate word from dictionary
	let lastCharIndex = word.charCodeAt(word.length - 1) - 97;
	fetch('./dictionary_alpha_arrays.json')
	.then(response => response.json())
	.then(dictionary => {
		const wordPool = Object.keys(dictionary[lastCharIndex]);
		while (true) {
			const wordPicked = wordPool[Math.floor(Math.random() * wordPool.length)];
			if (wordList.indexOf(wordPicked) == -1) {
				wordList.push(wordPicked);
				break;
			}
		}
	});
	
	await sleep(5000);

	fetch('./dictionary_alpha_arrays.json')
	.then(response => response.json())
	.then(dictionary => {
		let wordPicked = wordList[wordList.length - 1];
		wordLast.innerHTML = wordPicked;
		wordDef.innerHTML = dictionary[lastCharIndex][wordPicked];
		wordChain.innerHTML = wordList.join(" - ");
	});
	
	// Wait and Return
	wordButton.disabled = false;
	wordInput.disabled = false;
}