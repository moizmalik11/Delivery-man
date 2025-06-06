const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected route
router.get('/me', auth, authController.getMe);

// Admin routes
router.get('/admin/users', auth, authController.getAllUsers);
router.delete('/admin/users/:id', auth, authController.deleteUser);

module.exports = router;