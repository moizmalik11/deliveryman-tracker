const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  item: String,
  status: String,
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
});
module.exports = mongoose.model('Order', OrderSchema);
