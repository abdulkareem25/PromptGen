import React from 'react';

const Dashboard = () => {
  const name = localStorage.getItem('name'); // Set this on login/signup if you want
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2 text-orange-600">Dashboard</h2>
        <p className="mb-2 text-gray-700">Welcome{name ? `, ${name}` : ''}! You are logged in.</p>
        <p className="text-gray-600">Here you can manage your prompts and templates.</p>
      </div>
    </div>
  );
};

export default Dashboard;
