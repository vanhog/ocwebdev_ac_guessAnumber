let inputField = document.getElementById('number_input') as HTMLInputElement;
let guessButton = document.getElementById('guessButton');

let gameRuns: number = 0;

function getValidGuess(): number {
  let guess: number = NaN;
  do {
    guess = Number(inputField.value);
    if (isNaN(guess) || guess > 100 || guess < 1) {
      window.alert('To win, please, input a number between 1 and 100.');
      inputField.value = ' ';
    }
  } while (isNaN(guess));
  return guess;
}

function getNumGuesses(): number {
  const checkedRadio = document.querySelector<HTMLInputElement>(
    'input[name="guesses"]:checked',
  );
  let attempts: number = Number(checkedRadio?.value) || NaN;

  if (isNaN(attempts)) {
    let customAttempts: number = 0;
    do {
      customAttempts =
        Number(
          prompt('How many times do you want to guess the right number?'),
        ) || NaN;
    } while (isNaN(customAttempts));
    attempts = customAttempts;
  }
  return attempts;
}

guessButton?.addEventListener('click', function () {
  if (!(gameRuns > 0)) {
    gameRuns = getNumGuesses();
  }

  // disable radio buttons to avoid distraction
  const radios = document.querySelectorAll<HTMLInputElement>(
    'input[name="guesses"]',
  );
  radios.forEach((radio) => (radio.disabled = true));

  for (let i = 1; i <= gameRuns; i++) {
    let guess = getValidGuess();
    if (guess === 5) {
      window.alert('You won!');
      inputField.value = '';
      break;
    } else {
      guess = getValidGuess();
    }
    console.log(i, gameRuns, guess, inputField.value);
  }
  radios.forEach((radio) => (radio.disabled = false));
  gameRuns = 0;
});
