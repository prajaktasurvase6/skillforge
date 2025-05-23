// src/components/Blog/Blog.js
import React from 'react';

const Blog = () => {
  // Sample blog data
  const blogs = [
    {
      id: 1,
      title: "The Ultimate Guide to Becoming a Full-Stack Developer",
      content:
        "In this guide, we will cover the essential skills you need to master to become a successful full-stack developer...",
      author: "John Doe",
      date: "May 20, 2025",
      image: "https://www.womenintech.co.uk/wp-content/uploads/2021/11/Tech-skills-2022-1.png"
    },
    {
      id: 2,
      title: "How to Learn Data Science in 2025",
      content:
        "Data science is one of the fastest-growing fields today. Learn how to get started in this exciting career...",
      author: "Jane Smith",
      date: "May 18, 2025",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Top 10 Python Libraries for Machine Learning",
      content:
        "Python is a popular language for machine learning. Here are the top 10 libraries you need to know...",
      author: "Alice Johnson",
      date: "May 15, 2025",
      image: "https://deeptechstartups.in/wp-content/uploads/2022/09/Deep-Tech-1.jpg"
    }
  ];

  return (
    <div className="container mx-auto py-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">SkillForge Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-md mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
          <p className="text-gray-500 text-sm mb-2">By {blog.author} | {blog.date}</p>
          <p className="text-gray-600 mb-4">{blog.content}</p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
            Read More
          </button>
        </div>
      ))}
    </div>
  );
};

export default Blog;