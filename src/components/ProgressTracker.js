// src/components/ProgressTracker.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLearningPath, getUserProgress, updateUserProgress } from '../firestore';
import { auth } from '../firebase';

const ProgressTracker = () => {
  const { pathId } = useParams();
  const [pathData, setPathData] = useState(null);
//   const [progress, setProgress] = useState([]);
  const [completedSkills, setCompletedSkills] = useState([]);

  useEffect(() => {
    const fetchPathAndProgress = async () => {
      try {
        const path = await getLearningPath(pathId);
        setPathData(path);

        const userId = auth.currentUser.uid;
        const userProgress = await getUserProgress(userId, pathId);
        
        if (userProgress) {
          setCompletedSkills(userProgress.completed || []);
        }
      } catch (error) {
        console.error("Error fetching path or progress:", error);
      }
    };

    fetchPathAndProgress();
  }, [pathId]);

  const handleSkillComplete = async (skill) => {
    try {
      const userId = auth.currentUser.uid;
      await updateUserProgress(userId, pathId, skill);
      setCompletedSkills((prevSkills) => [...prevSkills, skill]);
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  if (!pathData) {
    return <p className="text-center py-20">Loading learning path...</p>;
  }

  return (
    <div className="container mx-auto py-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{pathData.title} - Progress Tracker</h2>
      <ul className="list-disc list-inside mb-4">
        {pathData.skills.map((skill, index) => (
          <li key={index} className="mb-2">
            <span className={completedSkills.includes(skill) ? "line-through text-gray-500" : ""}>
              {skill}
            </span>
            {!completedSkills.includes(skill) && (
              <button
                onClick={() => handleSkillComplete(skill)}
                className="ml-4 bg-green-600 text-white py-1 px-3 rounded-md"
              >
                Mark as Complete
              </button>
            )}
          </li>
        ))}
      </ul>

      <p className="text-gray-600">
        Progress: {completedSkills.length} / {pathData.skills.length} skills completed
      </p>
    </div>
  );
};

export default ProgressTracker;