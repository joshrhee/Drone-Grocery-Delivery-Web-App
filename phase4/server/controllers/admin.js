const {query} = require('../services/db');

const createChain = async (req, res) => {
  const {chainname} = req.body;
  const sql = `CALL admin_create_grocery_chain("${chainname}")`;
  query(sql)
      .then(() => {
        return res.status(200).json({message: "Success"});
      }).catch((error) => {
        console.log(error);
        res.status(400).json({ message: "Failed to create chain"});
  });
}

const createStore = async (req, res) => {
  const {storename, chainname, street, city, state, zipcode} = req.body;
  const sql = `CALL admin_create_new_store("${storename}", "${chainname}", "${street}", "${city}", "${state}", "${zipcode}")`
  query(sql)
      .then(() => {
        return res.status(200).json({message: "Success"});
      }).catch((error) => {
        console.log(error);
        res.status(400).json({ message: "Failed to create store"});
  });
}

const createDrone = async (req, res) => {
  const {droneid, zipcode, radius, dronetech} = req.body;
  const sql = `CALL admin_create_drone(${droneid}, "${zipcode}", ${radius}, "${dronetech}")`
  query(sql)
      .then(() => {
        return res.status(200).json({message: "Success"});
      }).catch((error) => {
        console.log(error);
        res.status(400).json({ message: "Failed to create drone"});
  });
}

const createItem = async (req, res) => {
  const {itemname, itemtype, organic, origin} = req.body;
  const sql = `CALL admin_create_item("${itemname}", "${itemtype}", "${organic}", "${origin}")`
  query(sql)
      .then(() => {
        return res.status(200).json({message: "Success"});
      }).catch((error) => {
        console.log(error);
        res.status(400).json({ message: "Failed to create item"});
      });
}

const getCustomers = async (req, res) => {
  const {firstname, lastname} = req.body;
  const createTable = `CALL admin_view_customers(${firstname}, ${lastname})`;
  console.log(createTable);
  const sql = `SELECT * FROM admin_view_customers_result`;
  try {
    const _ = await query(createTable);
    const result = await query(sql);
    console.log(result);
    return res.status(200).json({result: result});
  } catch (error) {
    res.status(400).json({message: "Failed to make a proper query to database"});
    res.end();
  }
}

const getChains = async (req, res) => {
  const sql = 'SELECT * FROM chain';
  query(sql).then((result) => {
    console.log(result);
    return res.status(200).json({result: result});
  }).catch((error) => {
    console.log(error);
    res.status(400).json({ message: "Failed get list of grocery chains"});
  })
}

// need zipcode and drone techs ate each zipcode
const getZipcodeAndEmployee = async (req, res) => {
  const sql = `SELECT Username, Zipcode FROM store JOIN drone_tech ON
    store.StoreName = drone_tech.StoreName and store.ChainName = drone_tech.ChainName`;
  const drone_sql = 'SELECT MAX(ID) AS ID FROM drone';
  try {
    const result = await query(sql);
    const drone = await query(drone_sql);
    console.log(result, drone);
    return res.status(200).json({ result: result, drone: drone });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createChain,
  createStore,
  createDrone,
  createItem,
  getCustomers,
  getChains,
  getZipcodeAndEmployee
};