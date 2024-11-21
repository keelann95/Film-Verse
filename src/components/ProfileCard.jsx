import React from 'react';
import { Film, Users } from 'lucide-react';

const DEFAULT_PROFILE_PIC = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80';

const ProfileCard = ({ user }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-12 border border-gray-700/50">
      <div className="flex items-center gap-8">
        <img
          src={user.profile_picture || DEFAULT_PROFILE_PIC}
          alt={user.username}
          className="w-32 h-32 rounded-full object-cover ring-4 ring-purple-500/50"
          onError={(e) => {
            e.target.src = DEFAULT_PROFILE_PIC;
          }}
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-2">{user.username}</h2>
          <p className="text-gray-400 text-lg mb-4">{user.bio || 'Professional Movie Critic'}</p>
          <div className="flex gap-8">
            <div className="text-center">
              <span className="block text-2xl font-bold text-white">{user.followers_count || 0}</span>
              <span className="text-gray-400 flex items-center gap-2 justify-center">
                <Users size={18} /> Followers
              </span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-white">{user.following_count || 0}</span>
              <span className="text-gray-400 flex items-center gap-2 justify-center">
                <Film size={18} /> Following
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;