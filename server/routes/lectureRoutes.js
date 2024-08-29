const express = require('express');
const { addLecture, getLectures } = require('../controllers/lectureController');

const router = express.Router();

router.post('/api/lectures', addLecture);
router.get('/api/lectures', getLectures);

module.exports = router;
