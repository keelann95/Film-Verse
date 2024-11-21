/* eslint-disable react/prop-types */
import React from 'react';
import { Users, UserPlus } from 'lucide-react';

const DEFAULT_PROFILE_PICS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80'
];

const UserCard = ({ user, onFollow }) => {
  const handleFollowClick = (e) => {
    e.preventDefault();
    onFollow(user.id);
  };

  const getDefaultProfilePic = (username) => {
    const index = username ? username.length % DEFAULT_PROFILE_PICS.length : 0;
    return DEFAULT_PROFILE_PICS[index];
  };

  return (
    <div className="relative group flex-shrink-0 w-1/5">
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
              onClick={handleFollowClick}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex items-center gap-2"
            >
              <UserPlus size={18} />
              Follow
            </button>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <h4 className="text-lg font-semibold text-white text-center">{user.username}</h4>
          <div className="flex justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{user.followers_count || 0} Followers</span>
            </div>
            <div className="flex items-center gap-1">
              <UserPlus size={14} />
              <span>{user.following_count || 0} Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;