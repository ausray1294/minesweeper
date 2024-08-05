const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile').development);

router.get('/', (req, res) => {
  knex('games')
    .select('*')
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again',
      }),
    );
});

// Save game
router.post('/save', async (req, res) => {
  const { userId, board, mines, rows, cols } = req.body;

  try {
    const [game] = await knex('games')
      .insert({
        board: JSON.stringify(board), // Save board as JSON string
        mines,
        rows,
        cols,
      })
      .returning('*'); // Use '*' to return the entire row

    const gameId = game.id; // Extract the id from the returned row

    console.log('Inserted Game ID:', gameId); // Add logging to verify gameId

    await knex('user_game_join').insert({
      user_id: userId,
      game_id: gameId,
    });

    res.json({ gameId });
  } catch (error) {
    console.error('Failed to save game:', error);
    res.status(500).json({ error: 'Failed to save game' });
  }
});

router.get('/load/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const game = await knex('games')
      .join('user_game_join', 'games.id', 'user_game_join.game_id')
      .where('user_game_join.user_id', userId)
      .select('games.*')
      .orderBy('games.id', 'desc')
      .first();

    if (game) {
      const parsedBoard = JSON.parse(game.board);
      console.log('Loaded Game:', {
        id: game.id,
        board: parsedBoard,
        mines: game.mines,
        rows: game.rows,
        cols: game.cols,
      }); // Add logging to check loaded game

      res.status(200).json({
        id: game.id,
        board: parsedBoard, // Parse board from JSON string
        mines: game.mines,
        rows: game.rows,
        cols: game.cols,
      });
    } else {
      res.status(404).json({ message: 'No game found for user' });
    }
  } catch (error) {
    console.error('Error loading game:', error);
    res.status(500).json({ message: 'Error loading game', error });
  }
});

module.exports = router;
