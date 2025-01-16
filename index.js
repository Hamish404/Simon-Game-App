const title = $('h1');
const scoreElement = $('h2');
const modal = $('dialog');
const tickButton = $('.tick-button');
const greenButton = $('.green-btn');
const redButton = $('.red-btn');
const yellowButton = $('.yellow-btn');
const blueButton = $('.blue-btn');
const howToButton = $('.fa-question');
const buttons = [greenButton, redButton, yellowButton, blueButton];
let levelCounter = 1;
let computerMoves = [];
let playerMoves = [];
let intervalId;
let isClickable = false;
let score = JSON.parse(localStorage.getItem('score')) || 0;
let highScore = score;

setupEventListeners();
hideScore();
updateScore();
ifNewGame();

function playGame() {
  if (computerMoves.length !== playerMoves.length && movesAreSame(computerMoves, playerMoves)) {
    return;
  } else if (movesAreSame(computerMoves, playerMoves)) {
    updateLevel();
    updateScore();
    computerTurn();
    playerTurn();
  } else {
    title.text('Game Over!');
    playSound('Game Over!');
    showScore();
    $('body').css('background-color', 'red');
    isClickable = false;

    setTimeout(() => {
      $('body').css('background-color', '#041E3F');
    }, 200);

    setTimeout(() => {
      title.text('Press Any Key to Restart');
      $(document).on('keydown', () => {
        updateLevel();
        resetGame();
        computerTurn();
        removeEventListener(document);
        isClickable = true;
      })
    }, 1500);
  }
}

function computerTurn() {
  setTimeout(() => {
    const result = Math.floor(Math.random() * 4);
    playSound(buttons[result]);
    buttons[result].fadeOut(100);
    buttons[result].fadeIn(100);
    computerMoves.push(result);
  }, 500)
}

$('.btn').on('click', e => {
  const clickedButton = $(e.currentTarget);
  if (!isClickable) {
    return;
  }
  if (clickedButton.is(greenButton)) {
    playerMoves.push(0);
    playSound(greenButton);
    addHighlight(greenButton);
    playGame();
  };
  if (clickedButton.is(redButton)) {
    playerMoves.push(1);
    playSound(redButton);
    addHighlight(redButton);
    playGame();
  };
  if (clickedButton.is(yellowButton)) {
    playerMoves.push(2);
    playSound(yellowButton);
    addHighlight(yellowButton);
    playGame();
  };
  if (clickedButton.is(blueButton)) {
    playerMoves.push(3);
    playSound(blueButton);
    addHighlight(blueButton);
    playGame();
  };
});

function playerTurn() {
  playerMoves.length = 0;
}

function movesAreSame(computerMoves, playerMoves) {
  for (let i = 0; i < playerMoves.length; i++) {
    if (computerMoves[i] !== playerMoves[i]) {
      return false;
    }
  }
  return true;
}

function resetGame() {
  levelCounter = 1;
  computerMoves.length = 0;
  playerMoves.length = 0;
  title.text(`Level ${levelCounter}`);
  hideScore();
}

function updateScore() {
  if (levelCounter > highScore) {
    highScore = levelCounter;
    localStorage.setItem('score', JSON.stringify(highScore));
  }
}

function showScore() {
  scoreElement.text(`High Score: ${highScore}`);
  scoreElement.css('visibility', 'visible');
}

function hideScore() {
  scoreElement.css('visibility', 'hidden');
}

function updateLevel() {
  levelCounter++
  title.text(`Level ${levelCounter}`);
}

function addHighlight(button) {
  button.addClass('highlight');

  setTimeout(() => {
    button.removeClass('highlight');
  }, 150);
}

function setupEventListeners() {
  $(document).on('keydown', e => {
    if (e.key === 'a' && levelCounter === 1) {
      isClickable = true;
      removeEventListener(document);
      resetGame();
      computerTurn();
    }
  });

  $(document).on('touchstart', e => {
    isClickable = true;
    removeEventListener(document);
    resetGame();
    computerTurn();
  });

  tickButton.on('click', () => {
    modal[0].close();
  });

  $(howToButton).on('click', e => {
    modal[0].show();
  })
}

function removeEventListener(element) {
  $(element).off('keydown');
  $(element).off('touchstart');
}

function playSound(type) {
  switch (type) {
    case greenButton:
      const audio1 = new Audio('sounds/green.mp3');
      audio1.volume = 0.5;
      audio1.play();
      break;
    case redButton:
      const audio2 = new Audio('sounds/red.mp3');
      audio2.volume = 0.5;
      audio2.play();
      break;
    case yellowButton:
      const audio3 = new Audio('sounds/yellow.mp3');
      audio3.volume = 0.5;
      audio3.play();
      break;
    case blueButton:
      const audio4 = new Audio('sounds/blue.mp3');
      audio4.volume = 0.5;
      audio4.play();
      break;
    case 'Game Over!':
      const audio5 = new Audio('sounds/wrong.mp3');
      audio5.volume = 0.5;
      audio5.play();
      break;
  }
}

function ifNewGame() {
  if (highScore === 1) {
    modal[0].showModal();
  }
}

// To do:
// Simplify code - Ask ChatGPT of what can be improved upon and further use of jQuery