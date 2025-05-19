// src/components/Register.js
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store the user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto py-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register for SkillForge</h2>
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            required
          />
        </label>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Register</button>
        <p className="text-center text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;