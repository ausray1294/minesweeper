const saveGame = async (userId, board, mines, rows, cols) => {
  console.log('Saving Board:', JSON.stringify(board));

  const response = await fetch('http://localhost:8080/minesweep/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, board, mines, rows, cols }),
  });

  if (!response.ok) {
    throw new Error('Failed to save game');
  }

  const data = await response.json();
  return data.gameId;
};

export default saveGame;
