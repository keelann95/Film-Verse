import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, MessageSquare, Settings, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  const closeAll = () => {
    setShowDropdown(false);
    setIsMobileMenuOpen(false);
  };

  const NavLinks = () => (
    <>
      <Link to="/" className="text-white hover:text-purple-400 transition-colors" onClick={closeAll}>
        Home
      </Link>
      <Link to="/clubs" className="text-white hover:text-purple-400 transition-colors" onClick={closeAll}>
        Clubs
      </Link>
      <Link to="/forum" className="text-white hover:text-purple-400 transition-colors" onClick={closeAll}>
        Forum
      </Link>
      <Link to="/influencer" className="text-white hover:text-purple-400 transition-colors" onClick={closeAll}>
        Influencer
      </Link>
    </>
  );

  return (
    <nav className="bg-transparent p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          FilmVerse
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <NavLinks />
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
                      onClick={closeAll}
                    >
                      <MessageSquare size={18} className="mr-2" />
                      Create Post
                    </Link>
                    <Link
                      to="/update-profile"
                      className="block px-4 py-2 text-white hover:bg-gray-700 flex items-center"
                      onClick={closeAll}
                    >
                      <Settings size={18} className="mr-2" />
                      Update Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeAll();
                      }}
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
                    onClick={closeAll}
                  >
                    <LogOut size={18} className="mr-2" />
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          className="md:hidden text-white hover:text-purple-400 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800 p-4 space-y-4 z-50">
          <div className="flex flex-col space-y-4">
            <NavLinks />
          </div>
          <div className="border-t border-gray-700 pt-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/create-post"
                  className="block py-2 text-white hover:text-purple-400 flex items-center"
                  onClick={closeAll}
                >
                  <MessageSquare size={18} className="mr-2" />
                  Create Post
                </Link>
                <Link
                  to="/update-profile"
                  className="block py-2 text-white hover:text-purple-400 flex items-center"
                  onClick={closeAll}
                >
                  <Settings size={18} className="mr-2" />
                  Update Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeAll();
                  }}
                  className="w-full text-left py-2 text-white hover:text-purple-400 flex items-center"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 text-white hover:text-purple-400 flex items-center"
                onClick={closeAll}
              >
                <LogOut size={18} className="mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;