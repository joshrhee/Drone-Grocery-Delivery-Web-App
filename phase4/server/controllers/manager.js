const {query} = require('../services/db');

const getItems = async (req, res) => {
  console.log("getChainName started!");
  const {chainName} = req.body;
  try {
    const items_sql = `SELECT ItemName from item`;
    const plu_sql = `SELECT MAX(PLUNumber) + 1 as PLU FROM chain_item WHERE ChainName = "${chainName}"`;
    const plu = await query(plu_sql);
    const result = await query(items_sql);
    console.log("Result is: ", result);
    console.log("PLU is: ", plu)
    res.status(200).json({items: result, plu: plu});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Manager.js's getChainName has soem error"});
  }
  res.status(500);
}

const createItem = async (req, res) => {
  console.log("createItem started!");
  const {chainname, itemname, quantity, orderlimit, plunumber, price} = req.body;
  try {
    let sql = `CALL manager_create_chain_item("${chainname}", "${itemname}", ${quantity}, ${orderlimit}, ${plunumber}, ${price})`;
    console.log(sql);

    const result = await query(sql);
    console.log("Result: ", result);
    // let finalsql = `SELECT * from chain_item`;
    // const finalResult = await query(finalsql);
    // console.log("finalArray is: ", finalResult);
    res.status(200).json({result: "success"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Manager.js's createItem has some error"});
    res.end();
  }
}

const getDroneTechs = async (req, res) => {
  console.log("getDroneTechs started!")
  const { chainname, storename, username } = req.body;
  try {
    let sql = `CALL manager_view_drone_technicians("${chainname}",${username}, ${storename})`;
    console.log("Username : ", username)
    console.log("chainname : ", chainname)
    console.log("storename : ", storename)
    
    const result = await query(sql);
    console.log("Reuslt: ", result);
    let finalsql = `SELECT * from manager_view_drone_technicians_result`;
    const finalResult = await query(finalsql);

    console.log("SQL: ", sql);
    console.log("finalArray is: ", finalResult);
    res.status(200).json({ result: finalResult})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Manager.js's getDroneTechs has some error"});
    res.end();
  }
}


const getDrones = async (req, res) => {
  console.log("getDrones started!")
  const {username, droneid, droneradius} = req.body;
  try {
    const sql = `CALL  manager_view_drones("${username}", ${droneid}, ${droneradius})`;
    console.log(sql);
    const result = await query(sql);
    console.log("Result: ",  result);
    let finalsql = `SELECT * from manager_view_drones_result`;
    const finalResult = await query(finalsql);
    console.log("Final Result is: ", finalResult);
    res.status(200).json({ result: finalResult});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Manager.js's getDrones has some error"});
    res.end();
  }
}

const getStores = async (req, res) => {
  console.log("getStores is started!");
  const {username, storename, mintotal, maxtotal} = req.body;
  try {
    const sql = `CALL manager_manage_stores('${username}', ${storename}, ${mintotal}, ${maxtotal})`;
    console.log(sql);

    const result = await query(sql);
    console.log("Result : ", result);
    const finalsql = `SELECT * from manager_manage_stores_result`;
    const finalResult = await query(finalsql);
    console.log("Final result is: ", finalResult);
    res.status(200).json({result: finalResult});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "getStores has some problem!!"});
    res.end();
  }
}

module.exports = {
  getItems,
  createItem,
  getDroneTechs,
  getDrones,
  getStores
}