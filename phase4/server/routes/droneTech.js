const express = require('express');

//.post from controller
const {getHistory, assign,getOrderDetails, getOrderItems, getDrones } = require('../controllers/droneTech.js');

const router = express.Router();

router.post('/history', getHistory);
router.post('/assign', assign);
router.post('/order_details', getOrderDetails);
router.post('/order_items', getOrderItems);
router.post('/drones',getDrones);

module.exports = router;