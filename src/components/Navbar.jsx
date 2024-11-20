import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const NavLinks = [
    { title: 'Home', path: '/' },
    { title: 'Discover', path: '/discover' },
    { title: 'Movie Release', path: '/releases' },
    { title: 'Forum', path: '/forum' },
    { title: 'About', path: '/about' }
  ];

  return (
    <div className="p-2 flex justify-between text-center align-middle object-center items-center">
      <img
        className="w-48 md:w-72"
        src="https://see.fontimg.com/api/rf5/ZpJmK/ZWM1MTI5YzZkYjVlNGVmYTkzYTBjMjE3ODNmYTM0ZTcub3Rm/RmlsbSBWZXJzZQ/wood-carving.png?r=fs&h=81&w=1000&fg=FFFFFF&bg=353D4B&tb=1&s=81"
        alt="Film Verse"
      />
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex md:pl-28 gap-4 md:space-x-7 justify-center items-center">
        {NavLinks.map((link) => (
          <Link key={link.path} to={link.path}>{link.title}</Link>
        ))}
        <div>Log In</div>
        <div>Sign Up</div>
      </div>
      
      {/* Desktop Search & Auth */}
      <div className="hidden md:flex gap-4 items-center">
        <Link to="/search" className="text-2xl font-semibold">
          <CiSearch />
        </Link>
        <Link to="/signup" className="border p-2 rounded-md px-4 py-2">Sign up</Link>
        <Link to="/login" className="bg-[#03A737] p-2 rounded-md px-4 py-2 text-white">Log in</Link>
      </div>
      
      {/* Mobile Menu Toggle */}
      <div className="md:hidden text-2xl" onClick={toggleMenu}>
        {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>
      
      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full p-5 shadow-lg flex flex-col items-center space-y-4 z-10">
          {NavLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={toggleMenu}
            >
              {link.title}
            </Link>
          ))}
          <div onClick={toggleMenu}>Log In</div>
          <div onClick={toggleMenu}>Sign Up</div>
          <div className="flex gap-4 items-center">
            <Link to="/signup" className="border p-2 rounded-md px-4" onClick={toggleMenu}>Sign up</Link>
            <Link to="/login" className="bg-green-500 p-2 rounded-md px-4 text-white" onClick={toggleMenu}>Log in</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
