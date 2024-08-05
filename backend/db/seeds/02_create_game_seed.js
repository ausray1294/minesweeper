/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('games').del();

  // Inserts seed entries
  await knex('games').insert([
    {

      board: JSON.stringify([
        ['empty', 'empty'],
        ['empty', 'mine'],
      ]),
      mines: 1,
      rows: 2,
      cols: 2,
    },
    {

      board: JSON.stringify([
        ['empty', 'mine'],
        ['empty', 'empty'],
      ]),
      mines: 1,
      rows: 2,
      cols: 2,
    },
    {

      board: JSON.stringify([
        ['mine', 'empty'],
        ['empty', 'empty'],
      ]),
      mines: 1,
      rows: 2,
      cols: 2,
    },
  ]);
};
