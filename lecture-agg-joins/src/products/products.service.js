const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// configuration object
const addSupplier = mapProperties({
  supplier_id: "supplier.supplier_id",
  supplier_name: "supplier.supplier_name",
  supplier_city: "supplier.city",
});

function list() {
  // SELECT * FROM products;
  return knex("products").select("*");
}

function listOutOfStockCount() {
  // product_quantity_in_stock - contains number of available product quantity

  // counts the number of products that have a quantity of 0 in DB
  // SELECT product_quantity_in_stock, COUNT(product_id)
  // FROM products
  // WHERE product_quantity_in_stock = 0
  // GROUPBY out_of_stock;

  return knex("products")
    .select("product_quantity_in_stock as out_of_stock")
    .count("product_id")
    .where({ product_quantity_in_stock: 0 })
    .groupBy("out_of_stock");
}

function listPriceSummary() {
  // supplier id - identifier associated with the supplier

  // SELECT supplier_id, MIN(product_price), MAX(product_price), AVERAGE(product_price)
  // FROM products
  // GROUPBY supplier_id;

  return knex("products")
    .select("supplier_id")
    .min("product_price")
    .max("product_price")
    .avg("product_price")
    .groupBy("supplier_id");
}

function read(product_id) {
  // SELECT p.*
  // FROM products as p
  // JOIN supplier as s
  // ON s.supplier_id = p.supplier_id
  // WHERE p.product_id = 1

  return knex("products as p")
    .join("suppliers as s", "s.supplier_id", "p.supplier_id")
    .select("p.*", "s.*")
    .where({ "p.product_id": product_id })
    .first()
    .then(addSupplier);
}

module.exports = {
  list,
  listOutOfStockCount,
  listPriceSummary,
};
