/*
GAME FUNCTION:
- Player must guess a number between a min and and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// Assing UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess 
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Venligst gæt et nummer mellem ${min} og ${max}`, 'red');

    return;
  }

  // Check if won
  if (guess === winningNum) {
    // game over - won

    // change border color
    guessInput.style.borderColor = 'green';

    gameOver(true, `${winningNum} er korrekt, du vinder!`);

  } else {
    // wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // game over - lost

      gameOver(false, `Game Over, du tabte ;). Det rigtige nummmer var ${winningNum}`);

    } else {
      // game continues - answer wrong 

      // change border color
      guessInput.style.borderColor = 'red';

      // Clear input
      guessInput.value = '';

      // tell user it's the wrong number// tell 
      setMessage(`${guess} er forkert, du har ${guessesLeft} forsøg tilbage`, 'red');



    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  // disable input
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = 'color';
  // set text color
  message.style.color = color;
  // set message
  setMessage(msg);

  // Play again?
  guessBtn.value = 'Prøv igen';
  guessBtn.className += 'play-again';
}

// get winning number
function getRandomNum() {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

