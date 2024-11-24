import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import ProfileCard from './ProfileCard';
import PostCard from './PostCard';
import UserCarousel from './UserCarousel';
import UsersModal from './UserModal';
import { useNavigate } from 'react-router-dom';

const InfluencerPage = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [modalView, setModalView] = useState(null); // 'followers' or 'following' or null
  const navigate = useNavigate();

  const API_BASE_URL = 'http://127.0.0.1:5555';

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const [usersRes, profileRes, postsRes, followingRes, followersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/users`, { headers }),
        fetch(`${API_BASE_URL}/profile`, { headers }),
        fetch(`${API_BASE_URL}/posts`, { headers }),
        fetch(`${API_BASE_URL}/following`, { headers }),
        fetch(`${API_BASE_URL}/followers`, { headers }),
      ]);

      const [users, profile, posts, followingData, followersData] = await Promise.all([
        usersRes.json(),
        profileRes.json(),
        postsRes.json(),
        followingRes.json(),
        followersRes.json(),
      ]);

      setLoggedInUser(profile);
      setFollowers(followersData);
      setFollowing(followingData);

      // Filter out users that are already being followed
      const followingIds = followingData.map(user => user.id);
      const filteredUsers = users.filter(user => 
        user.id !== profile.id && !followingIds.includes(user.id)
      );
      setSuggestedUsers(filteredUsers);

      setUserPosts(posts.filter(post => post.user_id === profile.id));
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewComment = (postId, newComment) => {
    setUserPosts((prevPosts) => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFollow = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/follow/${userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to follow user');

      // After following, refetch the data to refresh suggested users
      await fetchData();
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/unfollow/${userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to unfollow user');

      // After unfollowing, refetch the data to refresh the state
      await fetchData();
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const handleRemoveFollower = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/remove-follower/${userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to remove follower');
      setFollowers(prev => prev.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error removing follower:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="text-white text-base sm:text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="text-red-500 text-base sm:text-xl text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        {loggedInUser && (
          <ProfileCard 
            user={loggedInUser}
            onFollowersClick={() => setModalView('followers')}
            onFollowingClick={() => setModalView('following')}
          />
        )}

        <div className="mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Suggested Users</h2>
          <UserCarousel
            users={suggestedUsers}
            onFollow={handleFollow}
            currentIndex={carouselIndex}
            setCurrentIndex={setCarouselIndex}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Your Posts</h2>
          {userPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {userPosts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onCommentSubmit={handleNewComment} // Pass the handleNewComment to PostCard
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 text-center border border-gray-700/50">
              <p className="text-gray-300 mb-4 text-sm sm:text-base">You haven't created any posts yet.</p>
              <button
                onClick={() => navigate('/create-post')}
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
              >
                <PlusCircle size={18} className="flex-shrink-0" />
                Create Your First Post
              </button>
            </div>
          )}
        </div>

        <UsersModal
          isOpen={modalView === 'followers'}
          onClose={() => setModalView(null)}
          title="Followers"
          users={followers}
          actionLabel="Remove"
          onAction={handleRemoveFollower}
        />

        <UsersModal
          isOpen={modalView === 'following'}
          onClose={() => setModalView(null)}
          title="Following"
          users={following}
          actionLabel="Unfollow"
          onAction={handleUnfollow}
        />
      </div>
    </div>
  );
};

export default InfluencerPage;
