// src/firestore.js
import { db } from './firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  Timestamp
} from 'firebase/firestore';
 
// Add a new user to the database
export const addUserToFirestore = async (userId, email, name) => {
  try {
    await setDoc(doc(db, "users", userId), {
      email,
      name,
      createdAt: Timestamp.now(),
      goals: [],
      skills: []
    });
    console.log("User added to Firestore");
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
};

// Get user data
export const getUserData = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// Add a new learning path
export const addLearningPath = async (title, description, skills, duration, courses) => {
  try {
    await addDoc(collection(db, "learning_paths"), {
      title,
      description,
      skills,
      duration,
      courses,
      createdAt: Timestamp.now()
    });
    console.log("Learning path added");
  } catch (error) {
    console.error("Error adding learning path:", error);
  }
};

// Fetch all learning paths
export const getLearningPaths = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "learning_paths"));
    const paths = [];
    querySnapshot.forEach((doc) => {
      paths.push({ id: doc.id, ...doc.data() });
    });
    return paths;
  } catch (error) {
    console.error("Error getting learning paths:", error);
    return [];
  }
};

// Fetch a single learning path
export const getLearningPath = async (pathId) => {
  try {
    const docRef = doc(db, "learning_paths", pathId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such path!");
      return null;
    }
  } catch (error) {
    console.error("Error getting learning path:", error);
    return null;
  }
};

// Add a new goal for the user
export const addGoalToUser = async (userId, goal) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      goals: arrayUnion(goal)
    });
    console.log("Goal added to user profile");
  } catch (error) {
    console.error("Error adding goal to user:", error);
  }
};

// Add a new skill for the user
export const addSkillToUser = async (userId, skill) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      skills: arrayUnion(skill)
    });
    console.log("Skill added to user profile");
  } catch (error) {
    console.error("Error adding skill to user:", error);
  }
};


// Enroll a user in a learning path
export const enrollUserInPath = async (userId, pathId) => {
  try {
    await setDoc(doc(db, "user_progress", `${userId}_${pathId}`), {
      userId,
      pathId,
      completed: [],
      startedAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    console.log("User enrolled in path");
  } catch (error) {
    console.error("Error enrolling user in path:", error);
  }
};

// // Get user progress for a learning path
// export const getUserProgress = async (userId, pathId) => {
//   try {
//     const docRef = doc(db, "user_progress", `${userId}_${pathId}`);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       return docSnap.data();
//     } else {
//       console.log("No progress found for this path");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error getting user progress:", error);
//     return null;
//   }
// };

// Update user progress
export const updateUserProgress = async (userId, pathId, skill) => {
  try {
    const docRef = doc(db, "user_progress", `${userId}_${pathId}`);
    await updateDoc(docRef, {
      completed: arrayUnion(skill),
      updatedAt: Timestamp.now()
    });
    console.log("User progress updated");
  } catch (error) {
    console.error("Error updating user progress:", error);
  }
};
// Get user progress for a specific learning path
export const getUserProgress = async (userId, pathId) => {
  try {
    const docRef = doc(db, "user_progress", `${userId}_${pathId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No progress found for this path");
      return null;
    }
  } catch (error) {
    console.error("Error getting user progress:", error);
    return null;
  }
};