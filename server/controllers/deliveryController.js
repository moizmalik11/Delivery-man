const Delivery = require('../models/delivery');
const { io } = require('../server');
// Get all deliveries
exports.getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().sort({ createdAt: -1 });
    res.json(deliveries);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get single delivery
exports.getDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ msg: 'Delivery not found' });
    res.json(delivery);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Create delivery
exports.createDelivery = async (req, res) => {
  try {
    const newDelivery = new Delivery(req.body);
    const delivery = await newDelivery.save();
    
    // Emit real-time update
    io.emit('delivery_updated', delivery);
    
    res.json(delivery);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Update delivery
exports.updateDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    // Emit real-time update
    io.emit('delivery_updated', delivery);
    
    res.json(delivery);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Delete delivery
exports.deleteDelivery = async (req, res) => {
  try {
    await Delivery.findByIdAndRemove(req.params.id);
    
    // Emit real-time update
    io.emit('delivery_deleted', req.params.id);
    
    res.json({ msg: 'Delivery removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};