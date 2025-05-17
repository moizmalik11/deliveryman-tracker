const express = require('express');
const router = express.Router();
const { addDriver, getDrivers } = require('../controllers/driverController');

router.post('/', addDriver);
router.get('/', getDrivers);

module.exports = router;
