const express = require('express');

// get from controller
const { getItems, createItem, getDroneTechs, getDrones, getStores } = require('../controllers/manager.js');

const router = express.Router();

router.post('/get_items', getItems)
router.post('/create_item', createItem);
router.post('/drone_techs', getDroneTechs);
router.post('/drones', getDrones);
router.post('/stores', getStores);

module.exports = router;