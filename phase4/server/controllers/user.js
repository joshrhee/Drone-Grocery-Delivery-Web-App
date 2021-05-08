const md5 = require('md5');
const ctype_xdigit = require('locutus/php/ctype/ctype_xdigit'); // for checking if md5
const {query} = require('../services/db');

const login = async (req, res)  => {
  // console.log(req.body);
  const {username, password} = req.body;
  const sql = 
    `SELECT
    users.Username as username,
    FirstName as firstName,
    LastName as lastName,
    Pass as password,
    Street as street,
    City as city,
    State as state,
    Zipcode as zip,
    StoreName as storeName,
    IFNULL(manager.ChainName, drone_tech.ChainName) as chainName,
    CcNumber as cardNumber,
    CVV as cvv,
    EXP_DATE as expDate
    FROM users
    LEFT OUTER JOIN manager ON users.Username = manager.Username
    LEFT OUTER JOIN drone_tech ON users.Username = drone_tech.Username
    LEFT OUTER JOIN customer ON users.Username = customer.Username
    WHERE users.Username = '${username}'`;
  query(sql)
  .then((result) => {
    console.log(result);
    const queryUsername = result[0]?.username;
    const queryPassword = result[0]?.password;
    if (!queryUsername) return res.status(404).json({ message: "User Does Not Exist"});
    const correct = isValidMd5(queryPassword) ? md5(password) === queryPassword : password === queryPassword;
    if (!correct) return res.status(400).json({ message: "Wrong Password"});
    res.status(200).json(createReturnData(result[0]));
    res.end();
  }).catch((error) => {
    console.log(error);
    res.status(500).json({ message: "Error: Something went wrong" });
    res.end();
  });
}

function createReturnData(object) {
  let out = [];
  for (const key in object) {
    const value = object[key];
    out.push({ type: key, payload: value});
  }
  return out;
}

function isValidMd5($md5 ='') {
  return $md5.length == 32 && ctype_xdigit($md5);
}

const register = async (req, res) => {
  console.log("registering");
  const {type, data} = req.body;
  console.log(data);
  type ? registerCustomer(data, res) : registerEmployee(data ,res);
}

const registerCustomer = async (data, res) => {
  const sql = `CALL register_customer('${data.Username}',
                                      '${data.Pass}',
                                      '${data.FirstName}',
                                      '${data.LastName}',
                                      '${data.Street}',
                                      '${data.City}',
                                      '${data.State}',
                                      '${data.Zipcode}',
                                      '${data.CcNumber}',
                                      '${data.CVV}',
                                      '${data.EXP_DATE}')`;
  try {
    const results = await query(sql);
    res.status(200).json({message: "success!"});
    res.end();
  } catch (error) {
    if (error.errno === 1062) {
      res.status(409).json({message: "Duplicate entry found"});
    } else {
      res.status(400).json({message:"fail"})
    }
  }
}

const registerEmployee = async (data, res) => {
  console.log("registering employee...");
  console.log(data);
  const register_query = `CALL register_employee('${data.Username}',
                                      '${data.Pass}', 
                                      '${data.FirstName}', 
                                      '${data.LastName}', 
                                      '${data.Street}', 
                                      '${data.City}', 
                                      '${data.State}', 
                                      '${data.Zipcode}')`;

  
  const role_query = data.StoreName === '' ? 
  `INSERT INTO manager VALUES ('${data.Username}', '${data.ChainName}')`
    :
  `INSERT INTO drone_tech VALUES ('${data.Username}', '${data.StoreName}', '${data.ChainName}')`;
  console.log(role_query);

  const delete_query = `DELETE FROM users WHERE users.Username = '${data.Username}'`;

  let registered = false;
  try{
    const register_results = await query(register_query);
    console.log(register_results);
    registered = true;
    const role_results = await query(role_query);
    console.log(role_results);
    res.status(200).json({message: "success"});
  } catch (error) {
    console.log(error.message);
    if (registered) await query(delete_query);
    if (error.errno === 1062) {
      res.status(409).json({message: "Duplicate entry found"});
    } else if (error.errno === 1452) {
      res.status(400).json({message: "Chain Name and/or Store Name not found"});
    } else {
      res.status(400).json({message:"fail"})
    }
  }
}


module.exports = { login, register};