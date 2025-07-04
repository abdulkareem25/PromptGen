import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-pink-200">
    <h1 className="text-4xl font-extrabold mb-4 text-purple-700">Welcome to PromptGen</h1>
    <p className="text-lg mb-8 text-gray-700">Your AI prompt management tool.</p>
    <div className="flex gap-4">
      <Link to="/login">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded shadow transition">Login</button>
      </Link>
      <Link to="/signup">
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow transition">Sign Up</button>
      </Link>
    </div>
  </div>
);

export default Home;
