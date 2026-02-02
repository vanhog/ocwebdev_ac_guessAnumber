let inputField = document.getElementById('number_input') as HTMLInputElement;
let guessButton = document.getElementById('guessButton');

let radios = document.getElementById('radios');

let gameRuns: number = getNumGuesses();
let runsDone: number = 1;
let vicNum: number = NaN;
let inGame: boolean = false;

radios?.addEventListener('change', () => {
  gameRuns = getNumGuesses();
});

/**
 * Evaluates the radio buttons for number guesses
 * Eventually asks for a custom value
 *
 * @returns Number of guesses for the run : number
 */
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

/**
 * Checks validity of a guess
 *
 *
 * @returns validity : boolean
 */
function checkValidityGuess(): boolean {
  let guess: number = Number(inputField.value);
  if (isNaN(guess) || guess > 100 || guess < 1) {
    return false;
  } else {
    return true;
  }
}

/**
 * Disables/Enables the radio buttons
 *
 */
function toggleRadioStates() {
  const radios = document.querySelectorAll<HTMLInputElement>(
    'input[name="guesses"]',
  );
  radios.forEach((radio) => (radio.disabled = !radio.disabled));
  // -
}

/**
 * Evaluates a guess against the winning number
 *
 */
guessButton?.addEventListener('click', function () {
  if (!inGame) {
    toggleRadioStates();

    vicNum = Math.floor(Math.random() * 100 + 1);
    console.log(vicNum);
    inGame = true;
  }

  if (checkValidityGuess()) {
    if (Number(inputField.value) === vicNum) {
      window.alert('You won!');
      inputField.value = '';
      runsDone = 1;
      inGame = false;
      toggleRadioStates();
    } else {
      if (runsDone >= gameRuns) {
        window.alert('Game over! You lost!');
        runsDone = 1;
        inGame = false;
        inputField.value = String(vicNum);
        toggleRadioStates();
      } else {
        window.alert('You are wrong!');
        inputField.value = '';
        runsDone += 1;
      }
    }
  } else {
    inputField.value = '';
    window.alert('Please, enter a number between 1 and 100.');
  }
});
