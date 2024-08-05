/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user_game_join').del();
  await knex('games').del();
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    { username: 'a', password: 'a' },
    {  username: 'b', password: 'b' },
    {  username: 'c', password: 'c' },
  ]);
};
