const categoriesService = require("./categories.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// //old way
// function list(req, res, next) {
//   categoriesService
//     .list()
//     .then((data) => res.json({ data }))
//     .catch(next);
// }


// new way
async function list(req, res, next) {

    const data = await categoriesService.list();
    res.json({ data });
 
}

module.exports = {
  list: asyncErrorBoundary(list),
};
