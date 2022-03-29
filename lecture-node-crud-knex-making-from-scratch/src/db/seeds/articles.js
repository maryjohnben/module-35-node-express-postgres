/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const articles = [
  { article_title: "Article 1", article_contents: "This is some content." },
  { article_title: "Article 2", article_contents: "This is some content." },
  { article_title: "Article 3", article_contents: "This is some content." },
];

exports.seed = async function (knex) {
  return knex
    .raw("TRUNCATE TABLE articles RESTART IDENTITY CASCADE")
    .then(() => knex("articles").insert(articles));
};
