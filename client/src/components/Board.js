import React from 'react';
import { Grid } from '@chakra-ui/react';
import Cell from './Cell';

const Board = ({ board, onClick }) => {
  return (
    <Grid templateColumns={`repeat(${board[0].length}, 1fr)`} gap={1}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => onClick(rowIndex, colIndex)}
          />
        )),
      )}
    </Grid>
  );
};

export default Board;
