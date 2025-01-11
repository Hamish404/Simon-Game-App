const greenButton = $('.green-btn');
const redButton = $('.red-btn');
const yellowButton = $('.yellow-btn');
const blueButton = $('.blue-btn');
const buttons = [greenButton, redButton, yellowButton, blueButton];
let computerMoves = [];
let playerMoves = [];

function buttonRandomizer() {
  const result = Math.floor(Math.random() * 4);
  buttons[result].fadeOut(100);
  buttons[result].fadeIn(100);
  return result
}

function gameStart() {
  computerMoves.push(buttonRandomizer());
  console.log(computerMoves);
}

$('.btn').on('click', function(e) {
  const clickedButton = $(e.currentTarget);

  if (clickedButton.is(greenButton)) {
    playerMoves.push(0);
  };
  if (clickedButton.is(redButton)) {
    playerMoves.push(1);
  };
  if (clickedButton.is(yellowButton)) {
    playerMoves.push(2);
  };
  if (clickedButton.is(blueButton)) {
    playerMoves.push(3);
  };

  console.log(playerMoves);
});
