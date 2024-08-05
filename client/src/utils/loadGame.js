const loadGame = async (userId) => {
  const response = await fetch(
    `http://localhost:8080/minesweep/load/${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to load game');
  }

  const data = await response.json();
  return data;
};

export default loadGame;
