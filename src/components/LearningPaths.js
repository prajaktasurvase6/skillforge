// src/components/LearningPaths.js
import React, { useEffect, useState } from 'react';
import { getLearningPaths } from '../firestore';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const LearningPaths = () => {
  const [paths, setPaths] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaths = async () => {
      const data = await getLearningPaths();
      setPaths(data);
    };
    fetchPaths();
  }, []);

  const handleEnroll = (pathId) => {
    const user = auth.currentUser;
    if (user) {
      navigate(`/learning-path/${pathId}`);
    } else {
      alert("Please log in to enroll in a learning path.");
      navigate('/login');
    }
  };

  return (
    <div className="container mx-auto py-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Available Learning Paths</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.length > 0 ? (
          paths.map((path) => (
            <div key={path.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{path.title}</h3>
              <p className="text-gray-600 mb-4">{path.description}</p>
              <ul className="list-disc list-inside mb-4">
                {path.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
              <Link to={`/learning-path/${path.id}`} className="bg-blue-600 text-white py-2 px-4 rounded-md block text-center mb-2">
                View Details
              </Link>
              <button
                onClick={() => handleEnroll(path.id)}
                className="bg-green-600 text-white py-2 px-4 rounded-md w-full"
              >
                Enroll Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No learning paths available yet.</p>
        )}
      </div>
    </div>
  );
};

export default LearningPaths;