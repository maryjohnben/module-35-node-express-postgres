const express = require("express");
// const articlesRouter = require("./articles/articles.router");
const productsRouter = require("./products/products.router");

const app = express();

// middlewares
app.use(express.json());

// routing
// app.use("/articles", articlesRouter);
app.use("/products", productsRouter);

module.exports = app;
