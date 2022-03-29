exports.up = function (knex) {
  return knex.schema.createTable("articles", (table) => {
    table.increments("article_id").primary();
    table.string("article_title");
    table.text("article_content");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("articles");
};
