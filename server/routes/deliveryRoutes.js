const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const auth = require('../middleware/auth');

router.get('/', auth, deliveryController.getDeliveries);
router.post('/', auth, deliveryController.createDelivery);
router.get('/:id', auth, deliveryController.getDelivery);
router.put('/:id', auth, deliveryController.updateDelivery);
router.delete('/:id', auth, deliveryController.deleteDelivery);



module.exports = router;