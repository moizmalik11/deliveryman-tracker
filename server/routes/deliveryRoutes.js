const express = require('express');
const router = express.Router();
const { createDelivery, getAllDeliveries } = require('../controllers/deliveryController');

router.post('/', createDelivery);
router.get('/', getAllDeliveries);

module.exports = router;
