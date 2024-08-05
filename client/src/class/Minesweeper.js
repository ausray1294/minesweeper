// class/Minesweeper.js
class Minesweeper {
  constructor(rows, cols, mines) {
    this.rows = rows;
    this.cols = cols;
    this.mines = mines;
    this.state = 'playing'; // 'playing', 'won', 'lost'
    this.board = this.createBoard();
    this.placeMines();
  }

  createBoard() {
    return Array(this.rows)
      .fill(null)
      .map(() => Array(this.cols).fill('empty'));
  }

  placeMines() {
    let placedMines = 0;
    while (placedMines < this.mines) {
      const row = Math.floor(Math.random() * this.rows);
      const col = Math.floor(Math.random() * this.cols);

      if (this.board[row][col] === 'empty') {
        this.board[row][col] = 'mine';
        placedMines++;
      }
    }
  }

  newGame() {
    this.state = 'playing';
    this.board = this.createBoard();
    this.placeMines();
    return 'A new board has been started';
  }

  clickCell(row, col) {
    if (this.board[row][col] === 'mine') {
      this.state = 'lost';
      return;
    }
    this.revealCell(row, col);
    if (this.checkWin()) {
      this.state = 'won';
    }
  }

  revealCell(row, col) {
    if (this.board[row][col] === 'empty') {
      this.board[row][col] = 'revealed';
    }
  }

  revealNeighbors(row, col) {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      if (
        newRow >= 0 &&
        newRow < this.rows &&
        newCol >= 0 &&
        newCol < this.cols &&
        this.board[newRow][newCol] === 'empty'
      ) {
        this.revealCell(newRow, newCol);
      }
    });
  }

  revealAllNonMines() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.board[row][col] === 'empty') {
          this.revealCell(row, col);
        }
      }
    }
    if (this.checkWin()) {
      this.state = 'won';
    }
  }

  checkWin() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.board[row][col] === 'empty') {
          return false;
        }
      }
    }
    return true;
  }
}

module.exports = Minesweeper;
