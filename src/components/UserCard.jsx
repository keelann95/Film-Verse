/* eslint-disable react/prop-types */
import React from 'react';
import { UserMinus, UserPlus } from 'lucide-react';

const UserCard = ({ user, actionLabel, onAction, isFollowing }) => {
  return (
    <div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl mb-3 border border-gray-700/50 hover:border-purple-500/50 transition-all">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <img
          src={user.Profile_picture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3"}
          alt={user.username}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-700 flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white text-sm sm:text-base truncate">{user.username}</h3>
        </div>
      </div>
      
      <button
        onClick={() => onAction(user.id)}
        className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors ml-2 text-sm sm:text-base ${
          isFollowing
            ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
            : 'bg-purple-500/20 text-purple-500 hover:bg-purple-500/30'
        }`}
      >
        {isFollowing ? <UserMinus size={16} className="flex-shrink-0" /> : <UserPlus size={16} className="flex-shrink-0" />}
        <span className="hidden xs:inline">{actionLabel}</span>
      </button>
    </div>
  );
}

export default UserCard;