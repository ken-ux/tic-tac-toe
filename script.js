let result = document.querySelector("p");

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
  let computer_made_move; // Prevents computer from making multiple moves in a row
  let game_over = false;

  const getPlayerTiles = () => player_tiles;
  const getComputerTiles = () => computer_tiles;

  const makeMove = (user, num, tile) => {
    if (!game_over) {
      result.textContent = "";
      if (gameBoard.getBoard()[num - 1] === undefined) {
        gameBoard.fillTile(num, user.symbol);
        if (user === player) {
          tile.textContent = user.symbol;
          player_tiles.push(num);
          computer_made_move = false;
          checkGame(player.name, player_tiles);

          // Computer makes move if it hasn't already
          if (!computer_made_move && !game_over) {
            let tiles = document.querySelectorAll(".tile");
            let empty_tiles = {};
            for (let i = 0; i < tiles.length; i++) {
              if (tiles[i].textContent === "") {
                empty_tiles[i + 1] = tiles[i];
              }
            }
            let keys = Object.keys(empty_tiles);
            let rand_choice = Number(
              keys[Math.floor(Math.random() * keys.length)]
            );
            computer_made_move = true;
            makeMove(computer, rand_choice, empty_tiles[rand_choice]);
          }
        } else {
          computer_made_move = true;
          tile.textContent = user.symbol;
          computer_tiles.push(num);
          checkGame(computer.name, computer_tiles);
        }
      } else {
        result.textContent = "That spot is taken!";
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
        game_over = true;
        result.textContent =
          username[0].toUpperCase() +
          username.slice(1).toLowerCase() +
          " has won!";
        break;
      }
    }
    if (!game_over && !gameBoard.getBoard().includes(undefined)) {
      game_over = true;
      result.textContent = "Tie! There are no more moves to make!";
    }
  };
  return { getPlayerTiles, getComputerTiles, makeMove, checkGame };
})();

let tiles = document.querySelectorAll(".tile");
for (let i = 0; i < tiles.length; i++) {
  let tile = tiles[i];
  tile.addEventListener("click", () => game.makeMove(player, i + 1, tile));
}
