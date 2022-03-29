const req = require("express/lib/request");
const articlesService = require("./articles.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  // request for data
  const data = await articlesService.list();
  res.json({ data }); // { data: dataFromDB }
  // articlesService.list().then(data => res.json(data))
}

async function read(req, res, next) {
  const { id } = req.params;

  // request for data
  const data = await articlesService.read(id);

  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
};
