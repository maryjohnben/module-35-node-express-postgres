const router = require("express").Router();
const controller = require("./articles.controller");

// create GET endpoint /articles
router.route("/").get(controller.list); // /articles

router.route("/:id").get(controller.read); // /articles/<article-id>

module.exports = router;
