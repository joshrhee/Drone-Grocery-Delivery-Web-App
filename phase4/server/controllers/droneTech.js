
const {query} = require('../services/db');

/* Screen 17: View Store Orders */
const getHistory = async (req, res) => {
  const { username, startDate, endDate } = req.body;
  console.log(req.body);
  const sql = `CALL drone_technician_view_order_history('${username}', ${startDate}, ${endDate})`; // format NULLs in the front end
  console.log(sql);
  try {
    const call = await query(sql);
    console.log("Successful procedure call");
    const select = 'SELECT * FROM drone_technician_view_order_history_result';
    const result = await query(select);
    console.log(result);
    return res.status(200).json({results: result});
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "An error occured"});
  }
}

const assign = async (req, res) => {
  const { username, droneid, orderStatus, orderid } = req.body;
  const sql = `CALL dronetech_assign_order('${username}', ${droneid}, '${orderStatus}', '${orderid}')`;
  query(sql)
  .then(() => {
    return res.status(200).json({ message: "success" });
  }).catch((error) => {
    console.log(error);
    res.status(400);
    res.end();
  });
}

/* Screen 18: View Order Details */
const getOrderDetails = async (req, res) => {
  const {username, orderid} = req.body;
  const sql = `CALL dronetech_order_details('${username}', '${orderid}')`;
  console.log(sql);
  try {
    const call = await query(sql);
    const select = 'SELECT * FROM dronetech_order_details_result';
    console.log("Success calling procedure");
    const result = await query(select);
    console.log(result);
    res.status(200).json({ result: result});
  } catch (error) {
    console.log(error);
    res.status(400);
    res.end();
  };
}

const getOrderItems = async (req, res) => {
  const {username, orderid} = req.body;
  const sql = `CALL dronetech_order_items('${username}', '${orderid}')`;
  try {
    console.log(sql);
    const call = await query(sql);
    const select = 'SELECT * from dronetech_order_items_result';
    console.log("Success calling procedure");
    const result = await query(select);
    console.log(result);
    return res.status(200).json({result: result});
  } catch (error) {
    console.log(error);
    res.status(400);
    res.end();
  }
}

/* Screen 19: Track Assigned Drones */
const getDrones = async (req, res) => {
  const {username, droneid, status} = req.body;
  const sql = `CALL dronetech_assigned_drones('${username}', ${droneid}, '${status}')`;
  console.log(sql);
  try {
    const call = await query(sql);
    const select = 'SELECT * FROM dronetech_assigned_drones_result';
    console.log('Success calling procedure');
    console.log(select);
    const result = await query(select);
    console.log(result);
    return res.status(200).json({ result: result});
  } catch (error) {
    console.log(error);
    res.status(400);
    res.end();
  };
}

module.exports = {
  getHistory,
  assign,
  getOrderDetails,
  getOrderItems,
  getDrones
}