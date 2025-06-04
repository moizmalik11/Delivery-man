const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  items: [{
    name: String,
    quantity: Number
  }],
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in-transit', 'delivered', 'failed'],
    default: 'pending'
  },
  deliveryPerson: {
    type: String,
    default: ''
  },
  location: {
    lat: Number,
    lng: Number
  },
  estimatedDelivery: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Delivery', DeliverySchema);
