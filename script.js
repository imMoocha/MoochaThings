
const words = ["pera", "auto", "persona", "oso", "agua"]; // Lista de palabras
let selectedWord = ""; // Palabra oculta
let guesses = 0; // Intentos del jugador
const maxGuesses = 10; // Número máximo de intentos

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    displayKeyboard();
}

function displayWord() {
    const wordDisplay = document.getElementById("word-display");
    wordDisplay.innerHTML = selectedWord.split('').map(letter => '_').join(' ');
}

function displayKeyboard() {
    const keyboard = document.getElementById("keyboard");
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (const letter of alphabet) {
        const letterButton = document.createElement("button");
        letterButton.textContent = letter;
        letterButton.classList.add("letter-button");
        letterButton.addEventListener("click", () => guessLetter(letter));
        keyboard.appendChild(letterButton);
    }
}

function guessLetter(letter) {
    const guessInput = document.getElementById("guess-input");
    guessInput.value = letter;
    makeGuess();
}

function makeGuess() {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.toLowerCase();

    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        alert("Por favor, ingresa una letra válida.");
        return;
    }

    if (selectedWord.includes(guess)) {
        const wordDisplay = document.getElementById("word-display");
        const wordArray = selectedWord.split('');
        for (let i = 0; i < wordArray.length; i++) {
            if (wordArray[i] === guess) {
                wordArray[i] = guess.toUpperCase();
            }
        }
        wordDisplay.innerHTML = wordArray.join(' ');

        if (wordArray.join('') === selectedWord.toUpperCase()) {
            endGame(true);
        }
    } else {
        guesses++;
        updateAttempts();
        if (guesses === maxGuesses) {
            endGame(false);
        }
    }
}

function updateAttempts() {
    const attemptsDisplay = document.getElementById("attempts");
    attemptsDisplay.textContent = `Intentos: ${guesses}/${maxGuesses}`;
}

function endGame(isWin) {
    const guessButton = document.getElementById("guess-button");
    guessButton.disabled = true;

    const resultMessage = document.getElementById("result-message");
    const emoji = document.getElementById("emoji");

    if (isWin) {
        resultMessage.textContent = "¡Ganaste!";
        emoji.textContent = "😃";
    } else {
        resultMessage.textContent = "¡Perdiste!";
        emoji.textContent = "😞";
    }
}

document.getElementById("guess-button").addEventListener("click", makeGuess);

startGame();