// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { getUserData, getUserProgress, getLearningPaths } from '../firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [userProgress, setUserProgress] = useState([]);
  const [recommendedPaths, setRecommendedPaths] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const data = await getUserData(currentUser.uid);
        setUserData(data);
        fetchUserProgress(currentUser.uid);
        fetchRecommendations(data.skills || []);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchUserProgress = async (userId) => {
    try {
      const progressDocs = await getUserProgress(userId);
      setUserProgress(progressDocs);
    } catch (error) {
      console.error("Error fetching user progress:", error);
    }
  };

  const fetchRecommendations = async (userSkills) => {
    try {
      const allPaths = await getLearningPaths();
      const recommended = allPaths.filter((path) => {
        // Recommend if the path has skills not already in the user's profile
        return path.skills.some((skill) => !userSkills.includes(skill));
      });
      setRecommendedPaths(recommended);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate('/login'))
      .catch((error) => console.error("Logout Error:", error));
  };

  return (
    <div className="container mx-auto py-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {userData.name || 'User'}!</h2>
      <p className="text-gray-600 mb-4">Email: {userData.email}</p>

      {/* Career Goals Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Career Goals</h3>
        {userData.goals && userData.goals.length > 0 ? (
          <ul className="list-disc list-inside mb-4">
            {userData.goals.map((goal, index) => (
              <li key={index}>{goal}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No career goals set yet.</p>
        )}
      </div>

      {/* Skills Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills</h3>
        {userData.skills && userData.skills.length > 0 ? (
          <ul className="list-disc list-inside mb-4">
            {userData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No skills added yet.</p>
        )}
      </div>

      {/* Active Learning Paths */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Active Learning Paths</h3>
        {userProgress.length > 0 ? (
          userProgress.map((progress, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-bold text-gray-800 mb-2">{progress.pathId}</h4>
              <p className="text-gray-600 mb-2">
                Progress: {progress.completed.length} skills completed
              </p>
              <Link
                to={`/progress/${progress.pathId}`}
                className="bg-blue-600 text-white py-2 px-4 rounded-md block text-center mb-2"
              >
                Continue Learning
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No active learning paths yet.</p>
        )}
      </div>

      {/* Personalized Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Personalized Recommendations</h3>
        {recommendedPaths.length > 0 ? (
          recommendedPaths.map((path, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-bold text-gray-800 mb-2">{path.title}</h4>
              <p className="text-gray-600 mb-2">{path.description}</p>
              <Link
                to={`/learning-path/${path.id}`}
                className="bg-green-600 text-white py-2 px-4 rounded-md block text-center"
              >
                Start Now
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No personalized recommendations available.</p>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white py-2 rounded-md mt-6"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;