
require('dotenv').config();
const { PORT = 5000, DATABASE_URL } = process.env;

const app = require("./app");


const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);
