const gameBoard = (function () {
  let board = {};
  board.tiles = new Array(9);
  const getBoard = () => board.tiles;
  const fillTile = (num, symbol) => {
    board.tiles[num - 1] = symbol;
  };
  return { getBoard, fillTile };
})();

const player = (function () {
  const name = "player";
  const symbol = "X";
  return { name, symbol };
})();

const computer = (function () {
  const name = "computer";
  const symbol = "O";
  return { name, symbol };
})();

// Keeps track of taken spaces, states who wins
const game = (function () {
  let player_tiles = [];
  let computer_tiles = [];
  const getPlayerTiles = () => player_tiles;
  const getComputerTiles = () => computer_tiles;
  const makeMove = (user, num) => {
    if (gameBoard.getBoard()[num - 1] === undefined) {
      gameBoard.fillTile(num, user.symbol);
      if (user === player) {
        player_tiles.push(num);
      } else {
        computer_tiles.push(num);
      }
    } else {
      console.log("Sorry, that spot is taken!");
    }
  };
  const checkGame = (user) => {
    // If user's array has winning combination of spots
    console.log(user + " won!");
  };
  return { getPlayerTiles, getComputerTiles, makeMove, checkGame };
})();
