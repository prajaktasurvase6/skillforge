// src/components/Login.js
import React from 'react';

const Login = () => {
  return (
    <div className="container mx-auto py-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login to SkillForge</h2>
      <form className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input type="email" className="w-full mt-2 p-2 border rounded-md" />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input type="password" className="w-full mt-2 p-2 border rounded-md" />
        </label>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Login</button>
      </form>
    </div>
  );
};

export default Login;