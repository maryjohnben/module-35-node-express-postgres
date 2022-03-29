const service = require("./restaurants.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const validFields = new Set([
  "restaurant_name",
  "restaurant_cuisine",
  "restaurant_address",
]);

function hasValidFields(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !validFields.has(field)
  );

  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  next();
}

async function listAverageRatingByOwner(req, res, next) {
  const data = await service.listAverageRatingByOwner()
//   console.log(data)
  const newData = data.map((each)=> {
    return {...each, avg: Number(each.avg)}
  })
  console.log(newData)
  res.json({ data: newData });
}

async function averageRating(req, res, next) {
  // your solution here
  const data = await service.averageRating();
  res.json({ data: { average_rating: Number(data.avg) } });
}

async function list(req, res) {
  const data = await service.list()
//   console.log(data)
  res.json({ data });
}

async function count(req, res, next) {
  // your solution here
  const data = await service.count();
  res.json({ data: { count: parseInt(data.count, 10) } });
}

async function create(req, res, next) {
  const newRestaurant = ({
    restaurant_name,
    address,
    cuisine,
    rating,
  } = req.body.data);
  const createdRestaurant = await service.create(newRestaurant);
  res.status(201).json({ data: createdRestaurant });
}

async function read(req, res) {
  res.json({ data: res.locals.restaurant });
}

async function readHighestRated(req, res, next) {
  // your solution here
  const data = await service.readHighestRated();
  res.json({ data });
}

async function restaurantExists(req, res, next) {
  const restaurant = await service.read(req.params.restaurantId);

  if (restaurant) {
    res.locals.restaurant = restaurant;
    return next();
  }
  next({ status: 404, message: `Restaurant cannot be found.` });
}

async function update(req, res) {
  const updatedRestaurant = {
    ...req.body.data,
    restaurant_id: res.locals.restaurant.restaurant_id,
  };

  const data = await service.update(updatedRestaurant);
  res.json({ data });
}

async function destroy(req, res) {
  await service.delete(res.locals.restaurant.restaurant_id);
  res.sendStatus(204);
}

module.exports = {
  averageRating: asyncErrorBoundary(averageRating),
  count: asyncErrorBoundary(count),
  create: [hasValidFields, asyncErrorBoundary(create)],
  delete: [asyncErrorBoundary(restaurantExists), asyncErrorBoundary(destroy)],
  list: asyncErrorBoundary(list),
  listAverageRatingByOwner: asyncErrorBoundary(listAverageRatingByOwner),
  read: [asyncErrorBoundary(restaurantExists), read],
  readHighestRated: asyncErrorBoundary(readHighestRated),
  update: [
    hasValidFields,
    asyncErrorBoundary(restaurantExists),
    asyncErrorBoundary(update),
  ],
};
