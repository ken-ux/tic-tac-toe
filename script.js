const gameBoard = (function () {
  let board = {};
  board.tiles = new Array(9);
  return board;
})();

function createPlayer(
  name = prompt("Please enter your name.", "player_one"),
  symbol = prompt("What symbol do you want to use?", "X")
) {
  return { name, symbol };
}

const computer = (function createComputer() {
  const { name, symbol } = createPlayer("computer", "O");
  return { name, symbol };
})();

const player = createPlayer();

// Keeps track of taken spaces, states who wins
const game = (function () {})();
