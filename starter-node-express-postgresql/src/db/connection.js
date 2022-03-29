// require("dotenv").config();

//if its NODE_ENV usually its in development
//If process.env.NODE_ENV isn't defined, then set the value to "development".
const env = process.env.NODE_ENV || "development"; //development

//here knexfile is object and env is fed to the object as seen below
// const myCar = {
//     make: 'Ford',
//     model: 'Mustang',
//     year: 1969
//   };
//same as myCar[make]  = 'Ford'
// can also do myCar.make = 'Ford'
const config = require("../../knexfile")[env];
const knex = require("knex")(config);

module.exports = knex;
