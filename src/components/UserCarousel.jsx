/* eslint-disable react/prop-types */
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import UserCard from './UserCard';

const UserCarousel = ({ users, onFollow, currentIndex, setCurrentIndex }) => {
  const visibleUsers = users.slice(currentIndex, currentIndex + 5);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(users.length - 5, prev + 1));
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        {users.length > 5 && currentIndex > 0 && (
          <button
            onClick={handlePrevious}
            className="absolute left-0 z-10 bg-gray-800/80 p-2 rounded-full text-white hover:bg-gray-700/80 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        <div className="flex gap-4 overflow-hidden px-8">
          {visibleUsers.map(user => (
            <div key={user.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 flex-shrink-0">
              <UserCard
                user={user}
                actionLabel="Follow"
                onAction={onFollow}
              />
            </div>
          ))}
          {visibleUsers.length === 0 && (
            <div className="w-full text-gray-400 text-center p-4 bg-gray-800/50 rounded-xl">
              No suggestions available
            </div>
          )}
        </div>

        {users.length > 5 && currentIndex < users.length - 5 && (
          <button
            onClick={handleNext}
            className="absolute right-0 z-10 bg-gray-800/80 p-2 rounded-full text-white hover:bg-gray-700/80 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCarousel;