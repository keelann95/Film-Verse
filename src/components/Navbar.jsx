import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-transparent p-2  flex justify-between text-center align-middle object-center items-center">
      <img
        className="w-48 md:w-72"
        src="https://see.fontimg.com/api/rf5/ZpJmK/ZWM1MTI5YzZkYjVlNGVmYTkzYTBjMjE3ODNmYTM0ZTcub3Rm/RmlsbSBWZXJzZQ/wood-carving.png?r=fs&h=81&w=1000&fg=FFFFFF&bg=353D4B&tb=1&s=81"
        alt="Film Verse"
      />
      <div className="hidden md:flex md:pl-28 gap-4 md:space-x-7 justify-center items-center">
        <div>Home</div>
        <div>Discover</div>
        <div>Movie Release</div>
        <div>Forum</div>
        <div>About</div>
        <div>Log In</div>
        <div>Sign Up</div>
      </div>
      <div className="hidden md:flex gap-4 items-center">
        <div className="text-2xl font-semibold">
          <CiSearch />
        </div>
        <button className="border p-2 rounded-md px-4 py-2" type="button">Sign up</button>
        <button className="bg-[#03A737] p-2 rounded-md px-4 py-2 text-white" type="button">Log in</button>
      </div>
      <div className="md:hidden text-2xl" onClick={toggleMenu}>
        {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>
      {isOpen && (
        <div className="absolute top-20 left-0 w-full p-5 shadow-lg flex flex-col items-center space-y-4 z-10">
          <div onClick={toggleMenu}>Home</div>
          <div onClick={toggleMenu}>Discover</div>
          <div onClick={toggleMenu}>Movie Release</div>
          <div onClick={toggleMenu}>Forum</div>
          <div onClick={toggleMenu}>About</div>
          <div onClick={toggleMenu}>Log In</div>
          <div onClick={toggleMenu}>Sign Up</div>
          <div className="flex gap-4 items-center">
            <button className="border p-2 rounded-md px-4" type="button">Sign up</button>
            <button className="bg-green-500 p-2 rounded-md px-4 text-white" type="button">Log in</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
