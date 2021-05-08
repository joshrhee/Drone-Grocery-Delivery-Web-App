const mysql = require('mysql2/promise');
const config = require('../config');

/**
 * query function - function used to connect to database.
 * 
 * @param {*} sql : SQL query statement 
 * @param {*} params : Optional argument, used for having custom arguments for queries, not really used
 * @returns differnt things, objects for selects, results of modify statements, will throw errors
 */
async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  if (!connection) {
    console.log("Cannot connect to Database");
  } else {
    try {
      const [results, ] = await connection.execute(sql, params);
      connection.end();
      return results;
    } catch (error) {
      // console.log(error);
      connection.end();
      throw error;
    }
  }
}

module.exports = {query};