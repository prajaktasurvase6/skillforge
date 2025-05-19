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
    <div className="container mx-auto py-20 px-4 md:px-8">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">Available Learning Paths</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paths.length > 0 ? (
          paths.map((path) => (
            <div key={path.id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{path.title}</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">{path.description}</p>
              <ul className="list-disc list-inside mb-6 text-gray-600">
                {path.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleEnroll(path.id)}
                  className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg">
                  Enroll Now
                </button>
                
                <Link 
                  to={`/learning-path/${path.id}`} 
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold text-center hover:bg-blue-700 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg">
                  View Details
                </Link>
                
                <Link 
                  to={`/progress/${path.id}`} 
                  className="bg-gray-800 text-white py-2 px-6 rounded-lg font-semibold text-center hover:bg-gray-900 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg">
                  View Progress
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No learning paths available yet.</p>
        )}
      </div>
    </div>
  );
};

export default LearningPaths;