const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const lectureRoutes = require('./routes/lectureRoutes');
const http = require('http');
const { Server } = require('socket.io');


const app = express();
const PORT = process.env.PORT || 3000;

// Create HTTP server for both express and socket.io
const server = http.createServer(app);

// Initialize socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  // Frontend origin
    methods: ["GET", "POST"]
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/lecturesDB');


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Use the lecture routes
app.use('/api/lectures', lectureRoutes);

// Socket.io connection event
io.on('connection', (socket) => {
  console.log('A user connected: ', socket.id);

  // Listen for new lecture event
  socket.on('new-lecture', (lecture) => {
    // Broadcast the new lecture to all connected clients
    io.emit('new-lecture', lecture);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
  });
});

// Fallback for serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
