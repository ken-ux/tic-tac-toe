const gameBoard = (function () {
  let board = {};
  board.tiles = new Array(9);
  return board;
})();

function createPlayer(
  name = prompt("Please enter your name.", "player_one"),
  symbol = prompt("What symbol do you want to use?", "X")
) {
  let tiles_taken = [];
  const getTiles = () => tiles_taken;
  const takeTiles = (num) => tiles_taken.push(num);
  return { name, symbol, getTiles, takeTiles };
}

const computer = (function () {
  return createPlayer("computer", "O");
})();

const player = createPlayer();

// Keeps track of taken spaces, states who wins
const game = (function () {})();
