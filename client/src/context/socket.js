import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', { 
  transports: ['websocket'], // Force WebSocket (optional)
  autoConnect: false, // Optional: Connect manually
});

export default socket;