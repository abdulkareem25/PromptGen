import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiGrid, FiEdit, FiUser, FiLogOut } from 'react-icons/fi';

const Layout = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-8 h-8 rounded-md flex items-center justify-center">
                  <FiEdit className="text-white text-lg" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">PromptGen</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/" active={isActive('/')}>Home</NavLink>
              <NavLink to="/templates" active={isActive('/templates')}>Templates</NavLink>
              <NavLink to="/prompt-builder" active={isActive('/prompt-builder')}>Builder</NavLink>
              <NavLink to="/dashboard" active={isActive('/dashboard')}>Dashboard</NavLink>
            </div>
            <div className="flex items-center">
              {localStorage.getItem('token') ? (
                <button 
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                  }}
                  className="ml-4 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
                >
                  <FiLogOut className="inline mr-1" /> Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Login</Link>
                  <Link to="/signup" className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 gap-1">
          <MobileNavLink to="/" active={isActive('/')} icon={FiHome} label="Home" />
          <MobileNavLink to="/templates" active={isActive('/templates')} icon={FiGrid} label="Templates" />
          <MobileNavLink to="/prompt-builder" active={isActive('/prompt-builder')} icon={FiEdit} label="Builder" />
          <MobileNavLink to="/dashboard" active={isActive('/dashboard')} icon={FiUser} label="Profile" />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-7">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} PromptGen. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const NavLink = ({ to, children, active }) => (
  <Link 
    to={to} 
    className={`${active ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'} px-3 py-2 text-sm font-medium`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, icon: Icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex flex-col items-center justify-center py-2 text-xs ${active ? 'text-indigo-600' : 'text-gray-600'}`}
  >
    <Icon className="text-lg mb-1" />
    <span>{label}</span>
  </Link>
);

export default Layout;