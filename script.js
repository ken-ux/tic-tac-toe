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
  let game_over = false;
  let game_over_message = "";

  const getPlayerTiles = () => player_tiles;
  const getComputerTiles = () => computer_tiles;
  const makeMove = (user, num, tile) => {
    if (game_over) {
      console.log(game_over_message);
    } else {
      if (gameBoard.getBoard()[num - 1] === undefined) {
        gameBoard.fillTile(num, user.symbol);
        if (user === player) {
          tile.textContent = "X";
          player_tiles.push(num);
          checkGame(player.name, player_tiles);
        } else {
          computer_tiles.push(num);
          checkGame(computer.name, computer_tiles);
        }
      } else {
        console.log("Sorry, that spot is taken!");
      }
    }
  };

  const checkGame = (username, tiles) => {
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

    if (game_over) {
      console.log(game_over_message);
    } else {
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
          console.log(username + " has won!");
          game_over = true;
          game_over_message = username + " has already won, stop making moves!";
          break;
        } else if (!gameBoard.getBoard().includes(undefined)) {
          game_over = true;
          game_over_message = "There are no more moves to make, stop trying!";
          break;
        } else {
          console.log(
            username + " does not have numbers in " + winning_combos[i]
          );
        }
      }
    }
  };
  return { getPlayerTiles, getComputerTiles, makeMove, checkGame };
})();

let tiles = document.querySelectorAll(".tile");
for (let i = 0; i < tiles.length; i++) {
  let tile = tiles[i];
  tile.addEventListener("click", () => game.makeMove(player, i + 1, tile));
}