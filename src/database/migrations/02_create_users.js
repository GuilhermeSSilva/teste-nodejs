const Knex = require('knex');

exports.up = async function up(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('cpf').notNullable().unique();
    table.string('telephone').notNullable();
    table.string('address').notNullable();
  })
}

exports.down = async function down(knex) {
  return knex.schema.dropTable('users');
}