// const mongoose = require('mongoose');

// const driverSchema = new mongoose.Schema({
//   name: String,
//   phone: String,
//   location: {
//     lat: Number,
//     lng: Number,
//   },
//   available: {
//     type: Boolean,
//     default: true,
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Driver', driverSchema);
const mongoose = require('mongoose');
const DriverSchema = new mongoose.Schema({
  name: String,
  currentLocation: String,
});
module.exports = mongoose.model('Driver', DriverSchema);
