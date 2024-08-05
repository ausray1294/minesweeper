import React from 'react';
import { Button } from '@chakra-ui/react';

const Cell = ({ cell, onClick }) => {
  return (
    <Button
      onClick={onClick}
      bg={cell.wasClicked ? (cell.isBomb ? 'red.500' : 'gray.300') : 'blue.500'}
      color="white"
      _hover={{ bg: 'blue.400' }}
      disabled={cell.wasClicked}
    >
      {cell.wasClicked && (cell.isBomb ? '💣' : cell.adjacentBombCount || '')}
    </Button>
  );
};

export default Cell;
