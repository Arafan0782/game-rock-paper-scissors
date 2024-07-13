

const resultElement = document.querySelector('.js-result');
const movesElement = document.querySelector('.js-moves');
const rockButton = document.querySelector('.js-rock-button');
const paperButton = document.querySelector('.js-paper-button');
const scissorsButton = document.querySelector('.js-scissors-button');
const resetBuuton = document.querySelector('.js-reset-button');
const autoPlayButton = document.querySelector('.js-autoplay-button');

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

autoPlayButton.addEventListener('click', () => {
  autoPlay();
});

let isAutoplaying = false;
let intervalId;

function autoPlay() {
  // if we're not playing, then we want to start playing the game
  if (!isAutoplaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);

    //because we are now autoplaying
    isAutoplaying = true;
  } else {
    clearInterval(intervalId);
    isAutoplaying = false;
  }
}

rockButton.addEventListener('click', () => {
  playGame('Rock');
});

paperButton.addEventListener('click', () => {
  playGame('Paper');
});

scissorsButton.addEventListener('click', () => {
  playGame('Scissors');
});


document.body.addEventListener('keydown', (event) => {
  console.log(event.key);
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissors');
  } else if (event.key === ' ') {
    autoPlay();
  }
});


function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result;

  if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You lose.';
    } else if (computerMove === 'Paper') {
      result = 'You Lose.';
    } else if (computerMove === 'Scissors') {
      result = 'Tie.';
    } else if (computerMove === 'Paper') {
      result = 'You win.';
    }
  } else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You win.';
    } else if (computerMove === 'Paper') {
      result = 'Tie.';
    } else if (computerMove === 'Scissors') {
      result = 'You lose.';
    }
  } else if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie.';
    } else if (computerMove === 'Paper') {
      result = 'You lose.';
    } else if (computerMove === 'Scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if ((result = 'Tie.')) {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  resultElement.innerHTML = result;
  movesElement.innerHTML = `You 
      <img class="move-icon" src="images/${playerMove}-emoji.png">
      <img class="move-icon" src="images/${computerMove}-emoji.png">
      Computer `;

  updateScoreElement();
  // cleanPage()
}

function updateScoreElement() {
  const showScore = document.querySelector('.js-score');
  showScore.innerHTML = `Wins: ${score.wins}; Losses: ${score.losses}; Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'Paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'Scissors';
  }

  return computerMove;
}

resetBuuton.addEventListener('click', () => {
  resetScore();
  updateScoreElement();
});

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  localStorage.removeItem('score');

  resultElement.innerHTML = '';
  movesElement.innerHTML = '';
}
