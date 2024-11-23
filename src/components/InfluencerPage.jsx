import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProfileCard from './ProfileCard';
import UserCard from './UserCard';
import MovieCard from './MovieCard';

const App = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [currentUserSlide, setCurrentUserSlide] = useState(0);
  const [currentMovieSlide, setCurrentMovieSlide] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const API_BASE_URL = 'http://127.0.0.1:5555';

  const fetchData = async () => {
    try {
      const [moviesRes, usersRes, profileRes] = await Promise.all([
        fetch(`${API_BASE_URL}/upcoming`),
        fetch(`${API_BASE_URL}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }),
        fetch(`${API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }),
      ]);

      const [movies, users, profile] = await Promise.all([
        moviesRes.json(),
        usersRes.json(),
        profileRes.json(),
      ]);

      setUpcomingMovies(movies);
      setSuggestedUsers(users.filter((user) => user.id !== profile.id));
      setLoggedInUser(profile);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFollow = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/follow/${userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to follow user');

      // Remove the user from suggested users
      setSuggestedUsers(prev => prev.filter(user => user.id !== userId));
      
      // Update logged in user's following count
      if (loggedInUser) {
        setLoggedInUser({
          ...loggedInUser,
          following_count: loggedInUser.following_count + 1,
        });
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/unfollow/${userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to unfollow user');

      // Update logged in user's following count and list
      if (loggedInUser) {
        setLoggedInUser({
          ...loggedInUser,
          following_count: loggedInUser.following_count - 1,
          following: loggedInUser.following?.filter(user => user.id !== userId),
        });
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const handleRemoveFollower = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/remove-follower/${userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to remove follower');

      // Update logged in user's followers count and list
      if (loggedInUser) {
        setLoggedInUser({
          ...loggedInUser,
          followers_count: loggedInUser.followers_count - 1,
          followers: loggedInUser.followers?.filter(user => user.id !== userId),
        });
      }
    } catch (error) {
      console.error('Error removing follower:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-[#0a0a0a]"></div>
        <div className="relative container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-3 text-white">Movie Influencer Hub</h1>
          <p className="text-lg text-gray-300">Connect with movie enthusiasts and share your passion</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loggedInUser && (
          <ProfileCard
            user={loggedInUser}
            onUnfollow={handleUnfollow}
            onRemoveFollower={handleRemoveFollower}
          />
        )}

        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Suggested Users</h3>
            <button
              onClick={() => {
                setIsRefreshing(true);
                fetchData();
              }}
              disabled={isRefreshing}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          
          <div className="relative">
            <div className="flex gap-4 overflow-hidden">
              {suggestedUsers.slice(currentUserSlide, currentUserSlide + 5).map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onFollow={handleFollow}
                  onUnfollow={handleUnfollow}
                  onRemove={() => setSuggestedUsers(prev => prev.filter(u => u.id !== user.id))}
                />
              ))}
            </div>
            {currentUserSlide > 0 && (
              <button
                onClick={() => setCurrentUserSlide(prev => Math.max(0, prev - 5))}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 p-2 rounded-full text-white hover:bg-black/90 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
            )}
            {currentUserSlide < suggestedUsers.length - 5 && (
              <button
                onClick={() => setCurrentUserSlide(prev => Math.min(suggestedUsers.length - 5, prev + 5))}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 p-2 rounded-full text-white hover:bg-black/90 transition-colors"
              >
                <ArrowRight size={24} />
              </button>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-white">Trending Movies</h3>
          <div className="relative">
            <div className="flex gap-4 overflow-hidden">
              {upcomingMovies.slice(currentMovieSlide, currentMovieSlide + 5).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            {currentMovieSlide > 0 && (
              <button
                onClick={() => setCurrentMovieSlide(prev => Math.max(0, prev - 5))}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 p-2 rounded-full text-white hover:bg-black/90 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
            )}
            {currentMovieSlide < upcomingMovies.length - 5 && (
              <button
                onClick={() => setCurrentMovieSlide(prev => Math.min(upcomingMovies.length - 5, prev + 5))}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 p-2 rounded-full text-white hover:bg-black/90 transition-colors"
              >
                <ArrowRight size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;