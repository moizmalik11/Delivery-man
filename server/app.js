const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const deliveryRoutes = require('./routes/deliveryRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;