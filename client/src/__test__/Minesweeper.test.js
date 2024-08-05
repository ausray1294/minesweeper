// __test__/Minesweeper.test.js
const Minesweeper = require('../class/Minesweeper');

describe('Minesweeper', () => {
  let game;

  beforeEach(() => {
    game = new Minesweeper(10, 10, 10);
  });

  describe('Starting Board', () => {
    it('should create a 10x10 array for the board', () => {
      const baseBoard = game.board;
      expect(baseBoard.length).toEqual(10);
      expect(baseBoard[0].length).toEqual(10);
      expect(
        baseBoard.flat().every((cell) => cell === 'empty' || cell === 'mine'),
      ).toBeTruthy();
    });

    it('should allow new game to generate a new game', () => {
      const newGameMessage = game.newGame();
      expect(newGameMessage).toEqual('A new board has been started');
    });
  });

  describe('Mine Placement', () => {
    it('should place the correct number of mines on the board', () => {
      const mineCount = game.board
        .flat()
        .filter((cell) => cell === 'mine').length;
      expect(mineCount).toEqual(10);
    });
  });

  describe('Click Handling', () => {
    it('should reveal a cell when clicked', () => {
      game.clickCell(0, 0);
      expect(game.board[0][0]).not.toEqual('empty');
    });

    it('should end the game when a mine is clicked', () => {
      game.board[0][0] = 'mine'; // Manually set a mine for this test
      game.clickCell(0, 0);
      expect(game.state).toEqual('lost');
    });


  });

  describe('Game State', () => {
    it('should recognize a win when all non-mine cells are revealed', () => {
      game.revealAllNonMines();
      expect(game.state).toEqual('won');
    });
  });
});
