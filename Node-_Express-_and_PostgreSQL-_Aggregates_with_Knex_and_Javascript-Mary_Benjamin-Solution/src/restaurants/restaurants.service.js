const knex = require("../db/connection");

function averageRating() {
   return knex("restaurants").avg("rating").then((average)=> {
    const {avg} = average[0]
    return Number(avg)})
}

function count() {
  return knex("restaurants").count("restaurant_id").then((total) => {
    const{count} = total[0]
return Number(count)})
}

function create(newRestaurant) {
  return knex("restaurants")
    .insert(newRestaurant, "*")
    .then((createdRecords) => createdRecords[0]);
}

function destroy(restaurant_id) {
  return knex("restaurants").where({ restaurant_id }).del();
}

function list() {
  return knex("restaurants").select("*");
}

function read(restaurant_id) {
  return knex("restaurants").select("*").where({ restaurant_id }).first();
}

function readHighestRating() {
  return knex("restaurants").max("rating").then((maximum)=> {
    const {max} = maximum[0]
    return max
  })
}

function update(updatedRestaurant) {
  return knex("restaurants")
    .select("*")
    .where({ restaurant_id: updatedRestaurant.restaurant_id })
    .update(updatedRestaurant, "*");
}

module.exports = {
  averageRating,
  count,
  create,
  delete: destroy,
  list,
  read,
  readHighestRating,
  update,
};
