
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates';
import PromptBuilder from './pages/PromptBuilder';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/templates" element={
          <ProtectedRoute>
            <Templates />
          </ProtectedRoute>
        } />
        <Route path="/prompt-builder" element={
          <ProtectedRoute>
            <PromptBuilder />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
