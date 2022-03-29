const router = require("express").Router();
// import {Router as router} from "express";
const controller = require("./articles.controller");

// create GET endpoint /articles
router.route("/").get(controller.list); // /articles

router.route("/:id").get(controller.read); // /articles/<article-id>

// commonJS
module.exports = router;

// ES6 import export
// export default router;
