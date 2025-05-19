// src/components/LearningPathDetail.js
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const LearningPathDetail = () => {
  const { pathId } = useParams();
  const [pathData, setPathData] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Use useCallback to avoid the ESLint warning
  const fetchLearningPath = useCallback(async () => {
    try {
      const docRef = doc(db, "learning_paths", pathId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPathData(docSnap.data());
      } else {
        console.log("No such path!");
      }
    } catch (error) {
      console.error("Error fetching path:", error);
    }
  }, [pathId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchLearningPath();
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [fetchLearningPath, navigate]);

  const handleEnroll = async () => {
    if (!user) return;

    try {
      const userId = user.uid;
      await setDoc(doc(db, "user_progress", `${userId}_${pathId}`), {
        userId,
        pathId,
        completed: [],
        startedAt: new Date(),
      });
      alert("You have successfully enrolled in this path!");
    } catch (error) {
      console.error("Error enrolling in path:", error);
      alert("Failed to enroll in this path. Please try again.");
    }
  };

  if (!pathData) {
    return <p className="text-center py-20">Loading path details...</p>;
  }

  return (
    <div className="container mx-auto py-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{pathData.title}</h2>
      <p className="text-gray-600 mb-4">{pathData.description}</p>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills Covered</h3>
      <ul className="list-disc list-inside mb-4">
        {pathData.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended Courses</h3>
      <ul className="list-disc list-inside mb-4">
        {pathData.courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>

      <button
        onClick={handleEnroll}
        className="bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Enroll Now
      </button>
    </div>
  );
};

export default LearningPathDetail;