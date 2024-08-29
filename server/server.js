const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const lectureRoutes = require('./routes/lectureRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/lecturesDB');

// Middleware
app.use(express.json());
app.use(cookieParser());

// Use the lecture routes
app.use('/', lectureRoutes);

// Route for adding two numbers
app.get('/addTwoNumbers/:firstNumber/:secondNumber', (req, res, next) => {
  const firstNumber = parseInt(req.params.firstNumber);
  const secondNumber = parseInt(req.params.secondNumber);
  const result = firstNumber + secondNumber || null;

  if (result === null) {
    res.status(400).json({ result: result, statusCode: 400 });
  } else {
    res.status(200).json({ result: result, statusCode: 200 });
  }
});

// Serve the frontend HTML file as the last route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
