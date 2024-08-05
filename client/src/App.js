import React, { useState } from 'react';
import { ChakraProvider, Box, Button, Input, Stack } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { createBoard } from './utils/gameLogic';
import Board from './components/Board';
import saveGame from './utils/saveGame';
import loadGame from './utils/loadGame';
import login from './utils/login';

const App = () => {
  const [board, setBoard] = useState(createBoard(10, 10, 10));
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = (row, col) => {
    const newBoard = [...board];
    const cell = newBoard[row][col];

    if (cell.wasClicked) return;

    if (cell.isBomb) {
      cell.wasClicked = true;
      setBoard(newBoard);
      Swal.fire('Game Over', 'You clicked on a mine!', 'error');
    } else {
      revealCells(newBoard, row, col);
      setBoard(newBoard);
      if (checkWin(newBoard)) {
        Swal.fire('Congratulations', 'You have won the game!', 'success');
      }
    }
  };

  const revealCells = (board, row, col) => {
    if (
      row < 0 ||
      row >= board.length ||
      col < 0 ||
      col >= board[0].length ||
      board[row][col].wasClicked
    ) {
      return;
    }

    const cell = board[row][col];
    cell.wasClicked = true;

    if (cell.adjacentBombCount === 0) {
      revealCells(board, row - 1, col - 1);
      revealCells(board, row - 1, col);
      revealCells(board, row - 1, col + 1);
      revealCells(board, row, col - 1);
      revealCells(board, row, col + 1);
      revealCells(board, row + 1, col - 1);
      revealCells(board, row + 1, col);
      revealCells(board, row + 1, col + 1);
    }
  };

  const checkWin = (board) => {
    return board.flat().every((cell) => cell.wasClicked || cell.isBomb);
  };

  const startNewGame = () => {
    setBoard(createBoard(10, 10, 10));
    Swal.fire('New Game', 'A new game has started!', 'info');
  };

  const handleSaveGame = async () => {
    if (!userId) {
      Swal.fire('Error', 'You must be logged in to save the game.', 'error');
      return;
    }

    try {
      const gameId = await saveGame(userId, board, 10, 10, 10);
      Swal.fire(
        'Game Saved',
        `Your game has been saved with ID: ${gameId}`,
        'success',
      );
    } catch (error) {
      Swal.fire('Error', 'Failed to save the game.', 'error');
    }
  };

  const handleLoadGame = async () => {
    if (!userId) {
      Swal.fire('Error', 'You must be logged in to load the game.', 'error');
      return;
    }

    try {
      const game = await loadGame(userId);
      setBoard(game.board);
      Swal.fire('Game Loaded', 'Your game has been loaded!', 'info');
    } catch (error) {
      Swal.fire('Error', 'Failed to load the game.', 'error');
    }
  };

  const handleLogin = async () => {
    try {
      const data = await login(username, password);
      setUserId(data.userId);
      Swal.fire('Login Successful', 'You are now logged in.', 'success');
    } catch (error) {
      Swal.fire('Login Failed', 'Invalid username or password.', 'error');
    }
  };

  return (
    <ChakraProvider>
      <Box textAlign="center" fontSize="xl">
        <Stack spacing={4} mb={4}>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Login</Button>
        </Stack>
        <Button onClick={startNewGame} mb={4}>
          New Game
        </Button>
        <Board board={board} onClick={handleClick} />
        <Button onClick={handleSaveGame} mb={4}>
          Save Game
        </Button>
        <Button onClick={handleLoadGame} mb={4}>
          Load Game
        </Button>
      </Box>
    </ChakraProvider>
  );
};

export default App;
