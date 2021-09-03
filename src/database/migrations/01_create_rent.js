const Knex = require('knex');

exports.up = async function up(knex) {
  return knex.schema.createTable('rent', table => {
    table.increments('id').primary();
    table.dateTime('rentalDate');
    table.dateTime('returnDate');
    table.boolean('isRented').notNullable();
    table.integer('idMovie').notNullable();
    table.integer('idUser').notNullable();

    table.foreign('idMovie').references('id').inTable('movies');
    table.foreign('idUser').references('id').inTable('users');
  })
}

exports.down = async function down(knex) {
  return knex.schema.dropTable('rent');
}