// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/recommendation'); // Replace with actual route if different
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: 'url("https://img.freepik.com/free-photo/flat-lay-computer-laptop-isolated-whtie-background_53876-165301.jpg?ga=GA1.1.323325064.1748025807&semt=ais_hybrid&w=1500")',
      }}
    >
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Unlock Your Future with <span className="text-blue-600">SkillForge</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Let our AI recommend the best career paths and courses tailored to your skills and goals.
        </p>
        <button
          onClick={handleStart}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-10 rounded-md text-lg shadow-md transition duration-300"
        >
          Discover My Path
        </button>
      </div>
    </div>
  );
};

export default Home;

