export function createBoard(rows, cols, mines) {
  const board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      wasClicked: false,
      isBomb: false,
      adjacentBombCount: 0,
    })),
  );

  let placedMines = 0;
  while (placedMines < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    if (!board[row][col].isBomb) {
      board[row][col].isBomb = true;
      placedMines++;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!board[r][c].isBomb) {
        board[r][c].adjacentBombCount = countAdjacentBombs(
          board,
          r,
          c,
          rows,
          cols,
        );
      }
    }
  }

  return board;
}

function countAdjacentBombs(board, row, col, rows, cols) {
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

  return directions.reduce((count, [dx, dy]) => {
    const newRow = row + dx;
    const newCol = col + dy;
    if (
      newRow >= 0 &&
      newRow < rows &&
      newCol >= 0 &&
      newCol < cols &&
      board[newRow][newCol].isBomb
    ) {
      count++;
    }
    return count;
  }, 0);
}
