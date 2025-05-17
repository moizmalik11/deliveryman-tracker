const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  packageDetails: String,
  pickupAddress: String,
  dropoffAddress: String,
  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
  },
  status: {
    type: String,
    enum: ['pending', 'in-transit', 'delivered'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Delivery', deliverySchema);
