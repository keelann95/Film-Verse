import React from 'react';
import { FaInstagram } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { BsTwitterX } from "react-icons/bs";
import { FaGoogle } from "react-icons/fa";

const Footer = () => {
  const SocialIcon = ({ Icon }) => (
    <div className="bg-slate-50 text-black p-1 rounded-lg hover:bg-slate-100 transition-colors">
      <Icon size={20} />
    </div>
  );

  return (
    <div className="p-4 md:p-8 md:pl-16">
      {/* Main container */}
      <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-0">
        {/* Left side */}
        <div className="space-y-8 md:space-y-14">
          {/* Text content */}
          <h1 className="font-medium leading-relaxed md:leading-loose">
            Lorem ipsum dolor sit amet, consectetur{' '}
            <span className="hidden md:inline"><br /></span>
            adipisicing elit. Mollitia magnam numq{' '}
            <span className="hidden md:inline"><br /></span>
            uam aliquid dicta illum minima tem{' '}
            <span className="hidden md:inline"><br /></span>
            poribus obcaecati
          </h1>

          {/* Policy links */}
          <div className="font-serif text-gray-300">
            <div className="flex flex-wrap gap-3 md:gap-5">
              <button className="hover:text-gray-100 transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-gray-100 transition-colors">
                Term of service
              </button>
              <button className="hover:text-gray-100 transition-colors">
                Language
              </button>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="space-y-8 md:space-y-14">
          {/* Navigation */}
          <div className="font-serif text-gray-300">
            <div className="flex flex-wrap items-center">
              <button className="hover:text-gray-100 transition-colors">
                Home
              </button>
              <span className="px-2">/</span>
              <button className="hover:text-gray-100 transition-colors">
                Discover
              </button>
              <span className="px-2">/</span>
              <button className="hover:text-gray-100 transition-colors">
                Influence
              </button>
              <span className="px-2">/</span>
              <button className="hover:text-gray-100 transition-colors">
                Release
              </button>
            </div>
          </div>

          <div className="flex gap-5">
            <button aria-label="Instagram" className="hover:transform hover:scale-105 transition-transform">
              <SocialIcon Icon={FaInstagram} />
            </button>
            <button aria-label="Facebook" className="hover:transform hover:scale-105 transition-transform">
              <SocialIcon Icon={CiFacebook} />
            </button>
            <button aria-label="Twitter" className="hover:transform hover:scale-105 transition-transform">
              <SocialIcon Icon={BsTwitterX} />
            </button>
            <button aria-label="Google" className="hover:transform hover:scale-105 transition-transform">
              <SocialIcon Icon={FaGoogle} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;