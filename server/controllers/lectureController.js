const Lecture = require('../models/Lecture');

const addLecture = async (req, res) => {
  try {
    const lecture = new Lecture(req.body);
    await lecture.save();
    res.cookie('lastLecture', JSON.stringify(lecture), { maxAge: 900000, httpOnly: true });
    res.status(201).json({ message: 'Lecture added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add lecture' });
  }
};

const getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find();
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lectures' });
  }
};

module.exports = { addLecture, getLectures };
