
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

let lectures = [];

app.post('/api/lectures', (req, res) => {
  const lecture = req.body;
  lectures.push(lecture);

  res.cookie('lastLecture', JSON.stringify(lecture), { maxAge: 900000, httpOnly: true });

  res.status(201).json({ message: 'Lecture added successfully!' });
});

app.get('/api/lectures', (req, res) => {
  res.json(lectures);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
