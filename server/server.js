// const app = require('./app');
// const http = require('http');
// const socketio = require('socket.io');

// const server = http.createServer(app);
// const io = socketio(server, {
//   cors: {
//     origin: "http://localhost:3000", // Replace with your client URL
//     methods: ["GET", "POST"]
//   }
// });

// app.locals.io = io;

// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// io.on('connection', (socket) => {
//   console.log('New client connected ✅');

//   socket.on('disconnect', () => {
//     console.log('Client disconnected ❌');
//   });
// });
/**
 * Backend server for delivery man tracker
 * Features:
 * - Express API for fetching drivers
 * - Socket.io for real-time location updates
 * - MongoDB for storage of driver data
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // allow all origins for development, restrict in production
  },
});

app.use(cors());
app.use(express.json());

// MongoDB connection string - replace with your own or set environment variable MONGO_URI


mongoose.connect(MONGO_URI, {
 
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Driver schema and model
const driverSchema = new mongoose.Schema({
  name: String,
  status: { type: String, enum: ['idle', 'delivering'], default: 'idle' },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { // [longitude, latitude]
      type: [Number],
      required: true,
    },
  },
  avatarUrl: String, // URL to profile picture (optional)
}, { timestamps: true });

driverSchema.index({ location: '2dsphere' });

const Driver = mongoose.model('Driver', driverSchema);

// API endpoint: get all drivers
app.get('/drivers', async (req, res) => {
  try {
    const drivers = await Driver.find({});
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Optionally implement any server-side socket listeners here

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Simulate driver movement and emit updates every 5 seconds
// If you want, replace this with actual updates from device or admin dashboard
const simulateDriverMovement = async () => {
  try {
    const drivers = await Driver.find({});
    for (const driver of drivers) {
      // Simulate small random movement on map
      const [lng, lat] = driver.location.coordinates;

      // Random move delta +-0.0005 degrees
      const newLng = lng + (Math.random() - 0.5) * 0.001;
      const newLat = lat + (Math.random() - 0.5) * 0.001;

      driver.location.coordinates = [newLng, newLat];

      // Randomly change status sometimes
      if (Math.random() < 0.1) {
        driver.status = driver.status === 'idle' ? 'delivering' : 'idle';
      }

      await driver.save();

      // Emit the update to all connected clients
      io.emit('driverUpdated', {
        _id: driver._id,
        name: driver.name,
        status: driver.status,
        location: driver.location,
        avatarUrl: driver.avatarUrl,
      });
    }
  } catch (err) {
    console.error('Error during driver movement simulation:', err);
  }
};

// Run the simulation every 5 seconds
setInterval(simulateDriverMovement, 5000);

// Seed data if collection empty
const seedDriversIfEmpty = async () => {
  try {
    const count = await Driver.countDocuments();
    if (count === 0) {
      const seedDrivers = [
        {
          name: 'John Doe',
          status: 'delivering',
          location: { type: 'Point', coordinates: [-73.935242, 40.730610] },
          avatarUrl: 'https://i.pravatar.cc/100?img=1',
        },
        {
          name: 'Jane Smith',
          status: 'idle',
          location: { type: 'Point', coordinates: [-73.985130, 40.758896] },
          avatarUrl: 'https://i.pravatar.cc/100?img=2',
        },
        {
          name: 'Bob Johnson',
          status: 'delivering',
          location: { type: 'Point', coordinates: [-73.975360, 40.742054] },
          avatarUrl: 'https://i.pravatar.cc/100?img=3',
        },
      ];
      await Driver.insertMany(seedDrivers);
      console.log('Seeded initial drivers');
    }
  } catch (err) {
    console.error('Error seeding drivers:', err);
  }
};

seedDriversIfEmpty();

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

