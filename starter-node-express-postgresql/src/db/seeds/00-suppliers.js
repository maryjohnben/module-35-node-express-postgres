const suppliers = require("../fixtures/suppliers");

//direction to feed data into the tables
//data is fed from fixtures
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE suppliers RESTART IDENTITY CASCADE')
  await knex('suppliers').insert(suppliers);
}
