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
let isClickable = false;
let newHighScore = false;
let score = JSON.parse(localStorage.getItem('score')) || 0;
let highScore = score;

textForTouchScreensOnPageLoad();
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
    $('body').css('background-color', 'red');
    isClickable = false;

    setTimeout(() => {
      $('body').css('background-color', '#041E3F');
    }, 200);

    setTimeout(() => {
      if (newHighScore) {
        playSound('High Score!');

        setTimeout(() => {
          $('body').css('background-color', 'lime');
          title.text('New High Score!')
        }, 150);
  
        setTimeout(() => {
          $('body').css('background-color', '#041E3F');
          restartGameSetup();
          setTimeout(() => {
            showScore();
          }, 800);
        }, 2000);

      } else {
        restartGameSetup();
        setTimeout(() => {
          showScore();
        }, 800);
      }
    }, 1500);
  }
}

function computerTurn() {
  setTimeout(() => {
    const result = Math.floor(Math.random() * 4);
    playSound(buttons[result]);
    brightenButton(buttons[result]);
    setTimeout(() => {
      buttons[result].fadeOut(100);
      buttons[result].fadeIn(100);
    }, 100);
    computerMoves.push(result);
    isClickable = true;
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
    addBackgroundHighlight(greenButton);
    playGame();
  };
  if (clickedButton.is(redButton)) {
    playerMoves.push(1);
    playSound(redButton);
    addBackgroundHighlight(redButton);
    playGame();
  };
  if (clickedButton.is(yellowButton)) {
    playerMoves.push(2);
    playSound(yellowButton);
    addBackgroundHighlight(yellowButton);
    playGame();
  };
  if (clickedButton.is(blueButton)) {
    playerMoves.push(3);
    playSound(blueButton);
    addBackgroundHighlight(blueButton);
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

function updateScore() {
  if (levelCounter > highScore) {
    newHighScore = true;
    highScore = levelCounter;
    localStorage.setItem('score', JSON.stringify(highScore));
  } else {
    newHighScore = false;
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

function brightenButton(button) {
  buttons.forEach(btn => btn.removeClass('brighten'));
  button.addClass('brighten');

  setTimeout(() => {
    button.removeClass('brighten');
  }, 150);
}

function addBackgroundHighlight(button) {
  buttons.forEach(btn => btn.removeClass('highlight'));
  button.addClass('highlight');

  setTimeout(() => {
    button.removeClass('highlight');
  }, 150);
}

function setupEventListeners() {
  $(document).off('touchstart keydown');

  $(document).on('touchstart', function () {
    $('body').addClass('no-hover');
  });

  $(document).on('keydown', e => {
    if (e.key === 'a' && levelCounter === 1) {
      isClickable = true;
      removeEventListener(document);
      resetGame();
      computerTurn();
    }
  });

  $(document).on('touchstart', e => {
    e.preventDefault();
    if (!modal[0].open && e.target !== tickButton.get(0) && e.target !== howToButton.get(0)) {
      e.preventDefault()
      updateLevel();
      resetGame();
      computerTurn();
      removeEventListener(document);
    }
  });

  tickButton.on('click', () => {
    modal[0].close();
  });

  $(howToButton).on('click', () => {
    modal[0].show();
  })
}

function removeEventListener(element) {
  $(element).off('keydown');
  $(element).off('touchstart');
}

function textForTouchScreensOnPageLoad() {
  $(window).on('load', () => {
    if (window.matchMedia("(max-width: 900px)").matches) {
      displayTouchScreenText('Start');
    }  
  })
}

function displayTouchScreenText(startType) {
  title.text(`Press Anywhere to ${startType}`);
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
    case 'High Score!':
      const audio6 = new Audio('sounds/Success Sound Effect.mp3');
      audio6.play();
      break;
  }
}

function resetGame() {
  levelCounter = 1;
  computerMoves.length = 0;
  playerMoves.length = 0;
  title.text(`Level ${levelCounter}`);
  hideScore();
}

function restartGameSetup() {
  if (window.matchMedia("(max-width: 900px)").matches) {
    displayTouchScreenText('Restart');
    $(document).on('touchstart', e => {
      if (!modal[0].open && e.target !== $('.fa-check').get(0) && e.target !== howToButton.get(0)) {
        e.preventDefault()
        updateLevel();
        resetGame();
        computerTurn();
        removeEventListener(document);
      }
    });
  } else {
    title.text('Press Any Key to Restart');
    $(document).on('keydown', () => {
      updateLevel();
      resetGame();
      computerTurn();
      removeEventListener(document);
      isClickable = true;
    })
  }
}

function ifNewGame() {
  if (highScore === 1) {
    modal[0].showModal();
  }
}

// issue with high score display on non high score iterations
// Question mark screen enables gameplay when open and clicked, but not when first opened

// Simplify code - Ask ChatGPT of what can be improved upon and further use of jQuery