const express = require('express');

// get from controller
const { setCard, getHistory, getStore, order, review, updateOrder, getAvailableStores, getUserOrderNumbers, finalizeOrder } = require('../controllers/customer.js')

const router = express.Router();

router.post('/change_card', setCard); // one route for each test query, we may not need as many if same functionality
router.post('/history', getHistory);
router.post('/list_orders', getUserOrderNumbers);
router.post('/store_info', getAvailableStores);
router.post('/store', getStore);
router.post('/order', order);
router.post('/review', review);
router.post('/update_order', updateOrder);
router.post('/finalize_order', finalizeOrder);

module.exports = router;