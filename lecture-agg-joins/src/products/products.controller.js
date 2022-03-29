const productsService = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const res = require("express/lib/response");

async function list(req, res) {
  const data = await productsService.list();
  res.json({ data });
}

async function listOutOfStockCount(req, res) {
  const data = await productsService.listOutOfStockCount();
  res.json({ data });
}

async function listPriceSummary(req, res) {
  const data = await productsService.list();
  res.json({ data });
}

//   async function listProductCount(req, res) {
//     const data = await listProductCount.list();
//     res.json({ data });
//   }

async function read(req, res) {
  const { product_id } = req.params;
  const data = await productsService.read(product_id);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
  read: asyncErrorBoundary(read),
};
