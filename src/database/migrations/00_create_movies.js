const Knex = require('knex');

exports.up = async function up(knex) {
  return knex.schema.createTable('movies', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('director').notNullable();
    table.float('allocationValue').notNullable();
    table.integer('numberCopies').notNullable();
  })
}

exports.down = async function down(knex) {
  return knex.schema.dropTable('movies');
}