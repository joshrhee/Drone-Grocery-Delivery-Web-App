const dotenv = require('dotenv');

dotenv.config();

const config = {
  db: {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'grocery_drone_delivery',
  port: process.env.DB_PORT,
  multipleStatements: true
  }
};

module.exports = config;