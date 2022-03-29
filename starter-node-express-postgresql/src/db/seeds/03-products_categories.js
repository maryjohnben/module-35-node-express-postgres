const productsCategories = require("../fixtures/productsCategories");

//direction to feed data into the tables
//data is fed from fixtures
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE products_categories RESTART IDENTITY CASCADE')
  await knex('products_categories').insert(productsCategories);
}
