/* eslint-disable react/prop-types */
import React from 'react';
import { Users, UserPlus } from 'lucide-react';

const UserCard = ({ user, onFollow, onUnfollow, onRemove }) => {
  const DEFAULT_PROFILE_PICS = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3'
  ];

  const getDefaultProfilePic = (username) => {
    const index = username ? username.length % DEFAULT_PROFILE_PICS.length : 0;
    return DEFAULT_PROFILE_PICS[index];
  };

  const handleAction = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to continue');
      return;
    }

    if (user.isFollowing) {
      await onUnfollow(user.id);
    } else {
      await onFollow(user.id);
      if (onRemove) onRemove();
    }
  };

  return (
    <div className="relative group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex-shrink-0 px-2">
      <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 transition-all duration-300 h-full">
        <div className="relative">
          <img
            src={user.profile_picture || getDefaultProfilePic(user.username)}
            alt={user.username}
            className="w-full aspect-square rounded-lg object-cover"
            onError={(e) => {
              e.target.src = getDefaultProfilePic(user.username);
            }}
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={handleAction}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex items-center gap-2"
            >
              {user.isFollowing ? (
                <>
                  <Users size={18} />
                  Unfollow
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Follow
                </>
              )}
            </button>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <h4 className="text-lg font-semibold text-white text-center">{user.username}</h4>
          <div className="flex justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{user.followers_count || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <UserPlus size={14} />
              <span>{user.following_count || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;