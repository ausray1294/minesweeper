/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('games', function (table) {
    table.increments('id').primary();
    table.jsonb('board').notNullable();
    table.integer('mines').notNullable();
    table.integer('rows').notNullable();
    table.integer('cols').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('games');
};
