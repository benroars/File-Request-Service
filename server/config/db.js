const dbConfig = require('./db-config');
const knex = require('knex')({
  client: 'mysql',
  connection: dbConfig,
});

const db = require('bookshelf')(knex);

db.knex.schema.hasTable('urls').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('urls', (url) => {
      url.increments('id').primary();
      url.string('url', 255).unique();
      url.integer('userId');
      url.timestamps();
    }).then((table) => {
      console.log('Created Table urls:', table);
    });
  }
});

module.exports = db;
