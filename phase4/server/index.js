const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config.js');
const userRoutes = require('./routes/users.js');
const adminRoutes = require('./routes/admin.js');
const managerRoutes = require('./routes/manager.js');
const customerRoutes = require('./routes/customer.js');
const droneTechRoutes = require('./routes/droneTech.js');

dotenv.config() // setup an environment file for database username, password, and usch

const app = express(); // THis is our server app
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000; // This is our server port

app.listen(port, () => {
  console.log(`Server Running on Port: ${port}`)
});
app.use('/user', userRoutes); // paths for user actions
app.use('/admin', adminRoutes);
app.use('/manager', managerRoutes);
app.use('/customer', customerRoutes);
app.use('/drone_tech', droneTechRoutes);

app.get('/', (req, res) => {
  res.send('CS 4400 Team 85 Backend Server');
}) 

// check config.js file for connection to database settings
const connection = mysql.createConnection(config.db);

connection.connect((err) => {
  if (err) {
    console.log("ERROR: cannot connect to database");
  } else {
    console.log("Can connect to database");
  }
});
connection.end();
