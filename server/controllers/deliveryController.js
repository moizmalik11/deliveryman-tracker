const Delivery = require('../models/Delivery');

const createDelivery = async (req, res) => {
  try {
    const delivery = new Delivery(req.body);
    await delivery.save();
    res.status(201).json(delivery);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().populate('assignedDriver');
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createDelivery, getAllDeliveries };
