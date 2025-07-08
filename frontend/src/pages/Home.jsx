import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit3, FiBookOpen, FiBarChart2, FiZap } from 'react-icons/fi';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="text-indigo-600 mb-4 text-3xl">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home = () => (
  <div className="py-12">
    {/* Hero Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Craft Perfect AI Prompts
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
          Generate, refine, and optimize prompts for ChatGPT, DeepSeek, Gemini and more
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/signup" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Get Started
          </Link>
          <Link 
            to="/prompt-builder" 
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Try Demo
          </Link>
        </div>
      </div>
    </div>

    {/* Features Section */}
    <div className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything you need for prompt engineering
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<FiEdit3 />}
              title="Smart Builder"
              description="AI-powered suggestions to enhance your prompts in real-time"
            />
            <FeatureCard 
              icon={<FiBookOpen />}
              title="Template Library"
              description="Hundreds of pre-made templates for all use cases"
            />
            <FeatureCard 
              icon={<FiBarChart2 />}
              title="Performance Analytics"
              description="Track prompt effectiveness and AI response quality"
            />
            <FeatureCard 
              icon={<FiZap />}
              title="Multi-Platform"
              description="Export to ChatGPT, DeepSeek, Gemini and more"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Testimonials */}
    <div className="mt-24 bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Loved by creators worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "PromptGen has revolutionized how I interact with AI. My content creation time has been cut in half!",
              author: "Sarah Johnson",
              role: "Content Creator"
            },
            {
              quote: "The prompt quality scoring feature alone is worth the price. It's like having an AI expert looking over your shoulder.",
              author: "Michael Chen",
              role: "AI Researcher"
            },
            {
              quote: "I've tried all prompt tools - this is by far the most intuitive and powerful. The template library is a goldmine.",
              author: "Emma Rodriguez",
              role: "Marketing Director"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-indigo-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Home;