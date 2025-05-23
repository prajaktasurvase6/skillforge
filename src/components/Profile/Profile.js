// src/components/Profile/Profile.js
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { getUserData } from '../../firestore';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const data = await getUserData(currentUser.uid);
        setUserData(data);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate('/login'))
      .catch((error) => console.error("Logout Error:", error));
  };

  return (
    <div className="container mx-auto py-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile</h2>
      <p className="text-gray-600 mb-4">Name: {userData.name}</p>
      <p className="text-gray-600 mb-4">Email: {userData.email}</p>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Goals</h3>
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

      <div className="bg-white p-6 rounded-lg shadow-md">
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

      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white py-2 rounded-md mt-6"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;