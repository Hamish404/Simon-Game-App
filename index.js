const title = $('h1');
const greenButton = $('.green-btn');
const redButton = $('.red-btn');
const yellowButton = $('.yellow-btn');
const blueButton = $('.blue-btn');
const buttons = [greenButton, redButton, yellowButton, blueButton];
let levelCounter = 1;
let computerMoves = [];
let playerMoves = [];
let intervalId;

$(document).on('keydown', e => {
  if (e.key === 'a' && levelCounter === 1) {
    resetGame();
    title.text(`Level ${levelCounter}`);
    computerTurn();
    console.log('I was executed');
  }
});

function playGame() {
  if (computerMoves.length !== playerMoves.length && movesAreSame(computerMoves, playerMoves)) {
    return;
  } else if (movesAreSame(computerMoves, playerMoves)) {
    levelCounter++
    title.text(`Level ${levelCounter}`);
    computerTurn();
    playerTurn();
  } else {
    title.text('Game Over!');
    playSound('Game Over!');
    $('body').css('background-color', 'red');
    setTimeout(() => {
      $('body').css('background-color', '#041E3F');
    }, 200);
    setTimeout(() => {
      title.text('Press Any Key to Restart');
      $(document).on('keydown', () => {
        resetGame();
        title.text(`Level ${levelCounter}`);
        computerTurn();
        $(document).off('keydown');
        console.log('here');
      })
    }, 1500);
  }
}

function computerTurn() {
  setTimeout(() => {
    const result = Math.floor(Math.random() * 4);
    buttons[result].fadeOut(100);
    buttons[result].fadeIn(100);
    computerMoves.push(result);
    console.log(`Computer Moves: ${computerMoves}`);
  }, 500)
}

$('.btn').on('click', e => {
  const clickedButton = $(e.currentTarget);

  if (clickedButton.is(greenButton)) {
    playerMoves.push(0);
    console.log(`Player Moves: ${playerMoves}`);
    playSound(greenButton);
    addHighlight(greenButton);
    playGame();
  };
  if (clickedButton.is(redButton)) {
    playerMoves.push(1);
    console.log(`Player Moves: ${playerMoves}`);
    playSound(redButton);
    addHighlight(redButton);
    playGame();
  };
  if (clickedButton.is(yellowButton)) {
    playerMoves.push(2);
    console.log(`Player Moves: ${playerMoves}`);
    playSound(yellowButton);
    addHighlight(yellowButton);
    playGame();
  };
  if (clickedButton.is(blueButton)) {
    playerMoves.push(3);
    console.log(`Player Moves: ${playerMoves}`);
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

function addHighlight(button) {
  button.addClass('highlight');

  setTimeout(() => {
    button.removeClass('highlight');
  }, 200);
}