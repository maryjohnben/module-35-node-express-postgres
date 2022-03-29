const router = require("express").Router({ mergeParams: true });
const controller = require("./suppliers.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//no other http method possible
router.route("/")
.get(controller.list)
.post(controller.create)
.all(methodNotAllowed);

//example random
// router.route('/:id').get(controller.read)

router
  .route("/:supplierId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;
