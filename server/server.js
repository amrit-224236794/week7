const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/lecturesDB');

const lectureSchema = new mongoose.Schema({
  title: String,
  date: String,
  description: String
});

const Lecture = mongoose.model('Lecture', lectureSchema);

app.use(express.json());
app.use(cookieParser());

app.post('/api/lectures', async (req, res) => {
  const lecture = new Lecture(req.body);
  await lecture.save();
  res.cookie('lastLecture', JSON.stringify(lecture), { maxAge: 900000, httpOnly: true });
  res.status(201).json({ message: 'Lecture added successfully!' });
});

app.get('/api/lectures', (req, res) => {
  res.json(lectures); // Ensure this returns your lectures array
});

// Serve the frontend HTML file as the last route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
