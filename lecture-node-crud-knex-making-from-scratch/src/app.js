const express = require("express");
const articlesRouter = require("./articles/articles.router");

const app = express();

// middlewares
app.use(express.json());

// routing
app.use("/articles", articlesRouter);

module.exports = app;
