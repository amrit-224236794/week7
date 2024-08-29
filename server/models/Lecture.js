const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  title: String,
  date: String,
  description: String
});

const Lecture = mongoose.model('Lecture', lectureSchema);
module.exports = Lecture;