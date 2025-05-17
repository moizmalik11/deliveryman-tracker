const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');

// Setup environment and DB
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require('./routes/driverRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');

app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/deliveries', deliveryRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is working...');
});

// ✅ Setup Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Or specify frontend URL
    methods: ["GET", "POST"]
  }
});

// 🔄 Real-time socket connection
io.on('connection', (socket) => {
  console.log('🟢 A user connected:', socket.id);

  socket.on('locationUpdate', (data) => {
    console.log('📍 Driver Location Update:', data);
    io.emit('locationBroadcast', data); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
