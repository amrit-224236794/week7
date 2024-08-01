import React from 'react';

const LectureCard = ({ lecture }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">{lecture.title}</h2>
      <p className="text-gray-600">{lecture.date}</p>
      <p className="text-gray-600">{lecture.description}</p>
    </div>
  );
};

export default LectureCard;
