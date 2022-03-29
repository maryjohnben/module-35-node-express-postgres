const products = require("../fixtures/products");

//command = npx knex seed:run
//direction to feed data into the tables
//data is fed from fixtures
exports.seed = async function (knex) {
  // truncate Deletes ALL existing entries and starts from the first id
  await knex.raw('TRUNCATE TABLE products RESTART IDENTITY CASCADE')
  await knex('products').insert(products);
}
