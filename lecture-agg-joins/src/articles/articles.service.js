const knex = require("../db/connection");

function list() {
  return knex("articles").select("*");
}

function read(article_id) {
  return knex("articles").select("*").where({ article_id }).first();
}

module.exports = {
  list,
  read,
};
