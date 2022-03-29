// Update with your config settings.
const path = require("path"); //lets to use __dirname and all
require("dotenv").config(); //loads all .env variables into env dotenv is a popular library
const { DATABASE_URL } = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
    directory: path.join(__dirname, "src", "db", "seeds"),
   },
  },
};
