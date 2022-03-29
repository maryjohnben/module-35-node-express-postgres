const router = require("express").Router({ mergeParams: true });
const controller = require("./categories.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//.all(methodNotAllowed) used to make sure that any method to acess
//the route other than using .get is goin to return error 405
router.route("/")
.get(controller.list)
.all(methodNotAllowed);

router.route("/:categoryId")
.all(methodNotAllowed);

module.exports = router;
