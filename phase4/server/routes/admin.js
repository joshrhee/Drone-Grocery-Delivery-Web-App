const express = require('express');

// get from controller
const { createChain, createStore, createDrone, createItem, getCustomers, getZipcodeAndEmployee, getChains } = require('../controllers/admin.js');

const router = express.Router();

router.post('/create_chain', createChain);
router.post('/create_store', createStore);
router.post('/create_drone', createDrone);
router.post('/create_item', createItem);
router.post('/customers', getCustomers);
router.get('/chains', getChains);
router.get('/zip_and_tech', getZipcodeAndEmployee);

module.exports = router;