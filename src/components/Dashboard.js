// src/components/Dashboard.js
import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h2>
      <p className="text-gray-600 mb-4">Track your progress and stay motivated.</p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Current Learning Paths</h3>
        <ul className="list-disc list-inside">
          <li>Data Analyst Path</li>
          <li>Cloud Engineer Path</li>
          <li>AI Specialist Path</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;