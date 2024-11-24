/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Users, UserMinus, UserX } from 'lucide-react';

const ProfileCard = ({ user, onUnfollow, onRemoveFollower, suggestedUsers }) => {
  const [viewType, setViewType] = useState('following'); 
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchUserList = async () => {
      const token = localStorage.getItem('token');
      const url = viewType === 'following' ? 'following' : 'followers';
      try {
        const response = await fetch(`https://film-verse-backend.onrender.com/${url}?page=${currentPage}&limit=${usersPerPage}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUserList(data);
        }
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };

    fetchUserList();
  }, [viewType, currentPage, usersPerPage]);

  const handleUnfollow = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://film-verse-backend.onrender.com/unfollow/${userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to unfollow user');
      onUnfollow?.(userId); 
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const handleRemoveFollower = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://film-verse-backend.onrender.com/remove-follower/${userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to remove follower');
      onRemoveFollower?.(userId); 
      setIsModalOpen(false); 
    } catch (error) {
      console.error('Error removing follower:', error);
    }
  };

  const renderUserList = (list, isFollowers) => (
    <div className="space-y-4">
      {list.length > 0 ? (
        list.map((person) => (
          <div
            key={person.id}
            className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <img
                src={
                  person.Profile_picture ||
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
                onClick={() => {
                  handleUnfollow(person.id);
                  window.location.reload(); 
                }}
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

  const handlePageChange = (page) => {
    if (page > 0) {
      setCurrentPage(page);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-600 relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={user.Profile_picture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3"}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-white font-bold">{user.username}</h2>
            <p className="text-gray-400">{user.bio}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-white">{user.followers_count} Followers</span>
              <span className="text-white">{user.following_count} Following</span>
            </div>
          </div>
        </div>
        <div className="space-x-6">
          <button
            onClick={() => {
              setViewType('followers');
              toggleModal();
            }}
            className={`px-4 py-2 rounded ${viewType === 'followers' ? 'bg-blue-600' : 'bg-gray-600'}`}
          >
            Followers
          </button>
          <button
            onClick={() => {
              setViewType('following');
              toggleModal();
            }}
            className={`px-4 py-2 rounded ${viewType === 'following' ? 'bg-blue-600' : 'bg-gray-600'}`}
          >
            Following
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="inset-0 relative flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-zinc-950 p-6 rounded-lg w-96 max-w-full">
            <h3 className="text-white font-bold text-lg">{viewType === 'followers' ? 'Followers' : 'Following'}</h3>

            <div className="mt-4">
              {renderUserList(userList, viewType === 'followers')}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
              >
                Next
              </button>
            </div>

            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 p-2 text-white bg-red-600 rounded-full hover:bg-red-700"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
