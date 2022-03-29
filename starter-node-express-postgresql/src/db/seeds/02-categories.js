
 const categories = require("../fixtures/categories")
//direction to feed data into the tables
//data is fed from fixtures
 exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE categories RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("categories").insert(categories);
    });
};
