import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiBarChart2, FiBookOpen, FiEdit } from 'react-icons/fi';

const DashboardCard = ({ icon, title, value, link, linkText }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-gray-500 flex items-center">
          <span className="mr-2">{icon}</span>
          {title}
        </div>
        <div className="text-3xl font-bold mt-2">{value}</div>
      </div>
      <Link to={link} className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
        {linkText} <FiPlus className="ml-1" />
      </Link>
    </div>
  </div>
);

const RecentActivityItem = ({ icon, title, description, time }) => (
  <div className="flex py-4 border-b border-gray-100 last:border-0">
    <div className="flex-shrink-0 mr-4 text-indigo-600 text-xl">{icon}</div>
    <div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-sm text-gray-500 mt-1">{time}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats] = useState({
    prompts: 24,
    templates: 8,
    collections: 3,
    sessions: 42
  });

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome back! Here's your prompt activity overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          icon={<FiEdit />}
          title="Total Prompts"
          value={stats.prompts}
          link="/prompt-builder"
          linkText="Create"
        />
        <DashboardCard 
          icon={<FiBookOpen />}
          title="Templates"
          value={stats.templates}
          link="/templates"
          linkText="Add"
        />
        <DashboardCard 
          icon={<FiBarChart2 />}
          title="Collections"
          value={stats.collections}
          link="/dashboard"
          linkText="New"
        />
        <DashboardCard 
          icon={<FiBarChart2 />}
          title="Sessions"
          value={stats.sessions}
          link="/prompt-builder"
          linkText="Start"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-2">
            <RecentActivityItem 
              icon={<FiEdit />}
              title="Created new prompt"
              description="Marketing campaign for eco-friendly products"
              time="2 hours ago"
            />
            <RecentActivityItem 
              icon={<FiBookOpen />}
              title="Saved template"
              description="Academic research paper outline"
              time="1 day ago"
            />
            <RecentActivityItem 
              icon={<FiBarChart2 />}
              title="Exported to ChatGPT"
              description="15 prompts to JSON format"
              time="2 days ago"
            />
            <RecentActivityItem 
              icon={<FiEdit />}
              title="Improved prompt score"
              description="From 78% to 92% effectiveness"
              time="3 days ago"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Link 
              to="/prompt-builder" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-indigo-100 p-2 rounded-md mr-4">
                <FiEdit className="text-indigo-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Start New Prompt</h3>
                <p className="text-sm text-gray-500">Build from scratch or template</p>
              </div>
            </Link>
            <Link 
              to="/templates" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-purple-100 p-2 rounded-md mr-4">
                <FiBookOpen className="text-purple-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Browse Templates</h3>
                <p className="text-sm text-gray-500">Find pre-made prompt structures</p>
              </div>
            </Link>
            <Link 
              to="/dashboard" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-green-100 p-2 rounded-md mr-4">
                <FiBarChart2 className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">View Analytics</h3>
                <p className="text-sm text-gray-500">Track your prompt performance</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;