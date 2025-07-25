// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import LearningPaths from './components/LearningPaths';
import LearningPathDetail from './components/LearningPathDetail';
import ProgressTracker from './components/ProgressTracker';
import Blog from './components/Blog/Blog';
import Profile from './components/Profile/Profile';
import Recommendation from './components/AI/Recommendation';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/learning-paths" element={<LearningPaths />} />
            <Route path="/learning-path/:pathId" element={<LearningPathDetail />} />
            <Route path="/progress/:pathId" element={<ProgressTracker />} />
            <Route path="/blogs" element={<Blog />} />
           <Route path="/profile" element={<Profile />} />
           <Route path="/recommendation" element={<Recommendation />} />
                       
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;