const router = require("express").Router();
const controller = require("./products.controller");

// /products
router.route("/").get(controller.list);

// Custom Routes
router.route("/out-of-stock-count").get(controller.listOutOfStockCount);
router.route("/price-summary").get(controller.listPriceSummary);
// router.route("/product-count").get(controller.listProductCount);

router.route("/:product_id").get(controller.read);

module.exports = router;
