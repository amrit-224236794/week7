import React, { useState, useEffect } from 'react';
import LectureCard from './components/LectureCard';
import Modal from './components/Modal';
import Cookies from 'js-cookie';
import Nav from './components/Nav';

const App = () => {
  const [lectures, setLectures] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch lectures when the component mounts
  useEffect(() => {
    fetch('http://localhost:5173/api/lectures')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setLectures(data))
      .catch((error) => console.error('Failed to fetch lectures:', error));
  }, []);

  // Handle adding a new lecture
  const handleAddLecture = (lecture) => {
    // Optimistically update the UI
    setLectures([...lectures, lecture]);

    // Send the lecture to the server
    fetch('/api/lectures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lecture),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        // Set a cookie with the last added lecture
        Cookies.set('lastLecture', JSON.stringify(lecture), { expires: 1 });
      })
      .catch((error) => {
        console.error('Failed to add lecture:', error);
        // Rollback optimistic update in case of failure
        setLectures(lectures.filter((l) => l !== lecture));
      });
  };

  return (
    <>
      <Nav />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Lectures Attended</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add New
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lectures.map((lecture, index) => (
            <LectureCard key={index} lecture={lecture} />
          ))}
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddLecture}
        />
      </div>
    </>
  );
};

export default App;
