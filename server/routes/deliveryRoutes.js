const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const auth = require('../middleware/auth');

router.get('/', auth, deliveryController.getDeliveries);
router.post('/', auth, deliveryController.createDelivery);
router.get('/:id', auth, deliveryController.getDelivery);


router.put('/:id', auth, deliveryController.updateDelivery);
router.delete('/:id', auth, deliveryController.deleteDelivery);

// Socket.io integration
const { Server } = require('socket.io');
const io = require('../socket'); // Assuming you have a socket.js file that exports the io instance


module.exports = router;