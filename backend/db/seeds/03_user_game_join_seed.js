/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user_game_join').del();

  // Query the inserted users and games to get their IDs
  const users = await knex('users').select('id');
  const games = await knex('games').select('id');

  // Log the retrieved user and game IDs
  console.log('Users:', users);
  console.log('Games:', games);

  // Ensure the IDs are correctly formatted as integers
  const userGameJoinData = [
    { user_id: parseInt(users[0].id, 10), game_id: parseInt(games[0].id, 10) },
    { user_id: parseInt(users[1].id, 10), game_id: parseInt(games[1].id, 10) },
    { user_id: parseInt(users[2].id, 10), game_id: parseInt(games[2].id, 10) },
  ];

  // Log the data to be inserted
  console.log('UserGameJoinData:', userGameJoinData);

  // Inserts seed entries
  await knex('user_game_join').insert(userGameJoinData);
};
