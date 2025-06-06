// /server/models/Rider.js
const mongoose = require("mongoose");

const RiderSchema = new mongoose.Schema({
  riderId: String,
  name: String,
  lat: Number,
  lng: Number,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rider", RiderSchema);
