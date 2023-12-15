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
        checkGame(player_tiles);
        // Make computer do a move
      } else {
        computer_tiles.push(num);
        checkGame(computer_tiles);
      }
    } else {
      console.log("Sorry, that spot is taken!");
    }
  };

  const checkGame = (tiles) => {
    let winning_combos = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    for (let i = 0; i < winning_combos.length; i++) {
      let valid_combo = false;
      let combo = winning_combos[i];

      for (let j = 0; j < combo.length; j++) {
        if (tiles.includes(combo[j])) {
          valid_combo = true;
        } else {
          valid_combo = false;
          break;
        }
      }
      if (valid_combo) {
        console.log("user has won!");
        break;
      } else {
        console.log("user does not have numbers in " + winning_combos[i]);
      }
    }
  };
  return { getPlayerTiles, getComputerTiles, makeMove, checkGame };
})();
