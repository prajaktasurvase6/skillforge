// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { getUserData, addGoalToUser, addSkillToUser } from '../firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [newGoal, setNewGoal] = useState('');
  const [newSkill, setNewSkill] = useState('');
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

  const handleAddGoal = async (e) => {
    e.preventDefault();
    try {
      const userId = auth.currentUser.uid;
      await addGoalToUser(userId, newGoal);
      setUserData((prevData) => ({
        ...prevData,
        goals: [...(prevData.goals || []), newGoal],
      }));
      setNewGoal('');
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      const userId = auth.currentUser.uid;
      await addSkillToUser(userId, newSkill);
      setUserData((prevData) => ({
        ...prevData,
        skills: [...(prevData.skills || []), newSkill],
      }));
      setNewSkill('');
    } catch (error) {
      console.error("Error adding skill:", error);
    }
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
        <form onSubmit={handleAddGoal} className="flex">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add a new goal"
            className="flex-grow p-2 border rounded-l-md"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-md">Add Goal</button>
        </form>
      </div>

      {/* Skills Section */}
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
        <form onSubmit={handleAddSkill} className="flex">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a new skill"
            className="flex-grow p-2 border rounded-l-md"
            required
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-r-md">Add Skill</button>
        </form>
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