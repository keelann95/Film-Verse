/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Users, UserMinus, UserX } from 'lucide-react';

const ProfileCard = ({ user, onUnfollow, onRemoveFollower }) => {
  const [viewType, setViewType] = useState(null); // 'followers' or 'following'

  const handleUnfollow = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:5555/unfollow/${userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to unfollow user');
      onUnfollow?.(userId);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const handleRemoveFollower = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:5555/remove-follower/${userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to remove follower');
      onRemoveFollower?.(userId);
    } catch (error) {
      console.error('Error removing follower:', error);
    }
  };

  const renderUserList = (list, isFollowers) => (
    <div className="space-y-4">
      {list?.length > 0 ? (
        list.map((person) => (
          <div
            key={person.id}
            className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <img
                src={
                  person.profile_picture ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3"
                }
                alt={person.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-white">{person.username}</span>
            </div>
            {isFollowers ? (
              <button
                onClick={() => handleRemoveFollower(person.id)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors"
              >
                <UserX size={16} />
                Remove
              </button>
            ) : (
              <button
                onClick={() => handleUnfollow(person.id)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors"
              >
                <UserMinus size={16} />
                Unfollow
              </button>
            )}
          </div>
        ))
      ) : (
        <div className="text-gray-400">
          {isFollowers ? 'No followers to display' : 'Not following anyone'}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50">
      <div className="flex items-center gap-6">
        <img
          src={user.profile_picture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3"}
          alt={user.username}
          className="w-24 h-24 rounded-full object-cover border-2 border-purple-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{user.username}</h2>
          <div className="flex gap-6">
            <button
              onClick={() => setViewType('followers')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Users size={20} />
              <span>{user.followers_count} Followers</span>
            </button>
            <button
              onClick={() => setViewType('following')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Users size={20} />
              <span>{user.following_count} Following</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Followers or Following */}
      {viewType && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                {viewType === 'followers' ? 'Followers' : 'Following'}
              </h3>
              <button
                onClick={() => setViewType(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            {viewType === 'followers'
              ? renderUserList(user.followers, true)
              : renderUserList(user.following, false)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
