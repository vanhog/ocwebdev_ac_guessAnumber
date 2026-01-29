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

function checkValidityGuess(): boolean {
  guess = Number(inputField.value);
  if (isNaN(guess) || guess > 100 || guess < 1) {
    return false;
  } else {
    return true;
  }
}

function toggleRadioStates() {
  const radios = document.querySelectorAll<HTMLInputElement>(
    'input[name="guesses"]',
  );
  radios.forEach((radio) => (radio.disabled = !radio.disabled));
  // -
}

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

  // if (checkValidityGuess()) {
  //   if (Number(inputField.value) === vicNum) {
  //     window.alert('You won!');
  //     runsDone = 1;
  //     vicNum = NaN;
  //     // enable radio buttons again
  //     radios.forEach((radio) => (radio.disabled = false));
  //   } else {
  //     if (runsDone < gameRuns) {
  //       window.alert("Nope! You're wrong!");
  //       runsDone += 1;
  //       inputField.value = '';
  //     } else {
  //       window.alert('You lost! Game over!');
  //       // enable radio buttons again
  //       radios.forEach((radio) => (radio.disabled = false));
  //       runsDone = 1;
  //       vicNum = NaN;
  //     }
  //   }
  // }
});
