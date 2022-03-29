const articles = [
  { article_title: "Article 1", article_content: "This is some content." },
  { article_title: "Article 2", article_content: "This is some content." },
  { article_title: "Article 3", article_content: "This is some content." },
];

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE articles RESTART IDENTITY CASCADE")
    .then(() => knex("articles").insert(articles));
};
