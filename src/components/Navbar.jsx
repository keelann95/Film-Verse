import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, MessageSquare, Settings, LogOut } from 'lucide-react';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // If token exists, set logged in to true
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Update state when logged out
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <nav className="bg-transparent p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          FilmVerse
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-purple-400 transition-colors">
            Home
          </Link>
          <Link to="/clubs" className="text-white hover:text-purple-400 transition-colors">
            Clubs
          </Link>
          <Link to="/forum" className="text-white hover:text-purple-400 transition-colors">
            Forum
          </Link>
          <Link to="/influencer" className="text-white hover:text-purple-400 transition-colors">
            Influencer
          </Link>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-white hover:text-purple-400 transition-colors"
            >
              <UserCircle size={24} />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/create-post"
                      className="block px-4 py-2 text-white hover:bg-gray-700 flex items-center"
                    >
                      <MessageSquare size={18} className="mr-2" />
                      Create Post
                    </Link>
                    <Link
                      to="/update-profile"
                      className="block px-4 py-2 text-white hover:bg-gray-700 flex items-center"
                    >
                      <Settings size={18} className="mr-2" />
                      Update Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 flex items-center"
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-white hover:bg-gray-700 flex items-center"
                  >
                    <LogOut size={18} className="mr-2" />
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
