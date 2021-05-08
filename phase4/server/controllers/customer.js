const {query} = require('../services/db');

const setCard = async (req, res) => {
  const {username, newCCNumber, newCVV, newExpDate} = req.body;
  const sql = `CALL customer_change_credit_card_information('${username}', '${newCCNumber}', ${newCVV}, '${newExpDate}')`;
  query(sql)
  .then(() => {
    return res.status(200).json({ result: "Success"});
  }).catch((error) => {
    console.log(error);
    res.status(400);
    res.end();
  })
}

const getHistory = async (req, res) => {
  const { username, orderID} = req.body;
  console.log(req.body);
  const sql = `CALL customer_view_order_history('${username}', ${orderID})`;
  console.log(sql);
  try {
    const call = await query(sql);
    console.log("Successful procedure call");
    const select = 'SELECT * FROM customer_view_order_history_result';
    const result = await query(select);
    console.log(result);
    return res.status(200).json({results: result});
  } catch (error) {
    console.log(error);
    res.status(400).json({message: "An error occurred"});
    res.end();
  }
}

const getUserOrderNumbers = async (req, res) => {
  const {username} = req.body;
  const sql = `SELECT ID FROM orders WHERE CustomerUsername = '${username}'`;
  try {
    const result = await query(sql);
    console.log(result);
    return res.status(200).json({results: result});
  } catch (error) {
    console.log(error);
    res.status(400).json({message: "An error occurred"});
    res.end();
  }
}

// A new function to get the available stores in the customer's zip code
const getAvailableStores = async (req, res) => {
  const {username} = req.body;
  const sql = `SELECT ChainName, StoreName FROM store WHERE Zipcode IN (SELECT Zipcode FROM users WHERE users.Username = '${username}')`;
  try {
    const result = await query(sql);
    console.log(result);
    res.status(200).json({result: result})

  } catch (error) {
    console.log(error);
    res.status(400).json({message: "error"})
  }
}

const getStore = async (req, res) => {
  const { username, chainName, storeName, itemType } = req.body;
  console.log(req.body);
  const sql = `CALL customer_view_store_items('${username}', "${chainName}", "${storeName}", '${itemType}')`;
  console.log(sql);
  try {
    const call = await query(sql);
    console.log("Successful procedure call");
    const select = 'SELECT * FROM customer_view_store_items_result';
    const result = await query(select);
    console.log(result);
    return res.status(200).json({results: result});
  } catch (error) {
    console.log(error);
    res.status(400).json({message: "An error occurred"});
    res.end();
  }
}

const order = async (req, res) => {
  const {username, chainName, storeName, itemName, quantity } = req.body;
  const sql = `CALL customer_select_items('${username}', "${chainName}", "${storeName}", '${itemName}', ${quantity})`;
  console.log(sql);
  try {
    const call = await query(sql);
    return res.status(200).json({ result: "Success" });
  } catch (error) {
    console.log(error);
    res.status(400);
    res.end();
  }
}

const review = async (req, res) => {
  const { username } = req.body;
  console.log(req.body);
  const sql = `CALL customer_review_order('${username}')`;
  try {
    const call = await query(sql);
    console.log("Successful procedure call");
    const select = 'SELECT * FROM customer_review_order_result';
    const result = await query(select);
    console.log(result);
    return res.status(200).json({results: result});
  } catch (error) {
    console.log(error);
    res.status(400).json({message: "An error occurred"});
    res.end();
  }
}

const updateOrder = async (req, res) => {
  const {username, itemName, quantity } = req.body;
  const sql = `CALL customer_update_order('${username}', '${itemName}', ${quantity})`;
  query(sql)
      .then(() => {
        return res.status(200).json({ result: "Success" });
      }).catch((error) => {
    console.log(error);
    res.status(400);
    res.end();
  })
}

const finalizeOrder = async (req, res) => {
  const {username} = req.body;
  const sql = `UPDATE orders SET OrderStatus = 'Pending' WHERE CustomerUsername = '${username}' AND OrderStatus = 'Creating'`;
  query(sql)
  .then(() => {
    return res.status(200).json({result: "success"});
  }).catch((error) => {
    console.log(error);
    res.status(400);
    res.end();
  })
}

module.exports = {
  setCard,
  getHistory,
  getUserOrderNumbers,
  getStore,
  getAvailableStores,
  order,
  review,
  updateOrder,
  finalizeOrder
}