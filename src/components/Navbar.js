// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          <Link to="/">SkillForge</Link>
        </h1>
        <ul className="flex space-x-6">
          <li><Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link></li>
          <li><Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link></li>
          <li><Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link></li>
          <li><Link to="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link></li>
          <li><Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;