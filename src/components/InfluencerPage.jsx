import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProfileCard from './ProfileCard';
import UserCard from './UserCard';
import MovieCard from './MovieCard';

const InfluencerPage = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [currentUserSlide, setCurrentUserSlide] = useState(0);
  const [currentMovieSlide, setCurrentMovieSlide] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUpcomingMovies = async () => {
    try {
      const response = await fetch('https://film-verse-backend.onrender.com/upcoming');
      if (!response.ok) throw new Error('Failed to fetch upcoming movies');
      const data = await response.json();
      setUpcomingMovies(data);
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      setError('Failed to load movies');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://film-verse-backend.onrender.com/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setSuggestedUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users');
    }
  };

  const handleFollow = async (followedId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to follow users');
        return;
      }

      const response = await fetch(`https://film-verse-backend.onrender.com/follow/${followedId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to follow user');
      
      const data = await response.json();
      console.log(data);
      
      
      setSuggestedUsers(prev => prev.filter(user => user.id !== followedId));
      
      if (loggedInUser) {
        setLoggedInUser({
          ...loggedInUser,
          following_count: loggedInUser.following_count + 1
        });
      }

      alert('Successfully followed user');
    } catch (error) {
      console.error('Error following user:', error);
      alert('Failed to follow user');
    }
  };

  const handleWatchNow = (movie) => {
    if (movie.video) {
      window.open(movie.video, '_blank');
    } else {
      alert('Video link not available for this movie');
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([
        fetchUpcomingMovies(),
        fetchUsers(),
      ]);
    };

    initializeData();
  }, []);

  const nextUserSlide = () => {
    if (currentUserSlide < suggestedUsers.length - 5) {
      setCurrentUserSlide(currentUserSlide + 5);
    }
  };

  const prevUserSlide = () => {
    if (currentUserSlide > 0) {
      setCurrentUserSlide(currentUserSlide - 5);
    }
  };

  const nextMovieSlide = () => {
    if (currentMovieSlide < upcomingMovies.length - 5) {
      setCurrentMovieSlide(currentMovieSlide + 5);
    }
  };

  const prevMovieSlide = () => {
    if (currentMovieSlide > 0) {
      setCurrentMovieSlide(currentMovieSlide - 5);
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
      {/* Hero Section */}
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ_XQlYxXU7T5sBarAepZCVlEeuZn7Bfjj8w&s')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-[#0a0a0a]"></div>
        <div className="relative container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-3 text-white">Become A Movie Influencer</h1>
          <p className="text-lg text-gray-300">
            Share your thoughts about movies to inspire and become an influencer
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {loggedInUser && <ProfileCard user={loggedInUser} />}

        {/* Suggested Users Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-white">Suggested Users to Follow</h3>
          <div className="relative">
            <div className="flex gap-4 overflow-hidden">
              {suggestedUsers.slice(currentUserSlide, currentUserSlide + 5).map((user) => (
                <UserCard key={user.id} user={user} onFollow={handleFollow} />
              ))}
            </div>
            {currentUserSlide > 0 && (
              <button
                onClick={prevUserSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 p-2 rounded-full text-white hover:bg-black/90 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
            )}
            {currentUserSlide < suggestedUsers.length - 5 && (
              <button
                onClick={nextUserSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 p-2 rounded-full text-white hover:bg-black/90 transition-colors"
              >
                <ArrowRight size={24} />
              </button>
            )}
          </div>
        </div>

        {/* Trending Movies Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-white">Trending Movies</h3>
          <div className="relative">
            <div className="flex gap-4 overflow-hidden">
              {upcomingMovies.slice(currentMovieSlide, currentMovieSlide + 5).map((movie) => (
                <MovieCard key={movie.id} movie={movie} onWatchNow={handleWatchNow} />
              ))}
            </div>
            {currentMovieSlide > 0 && (
              <button
                onClick={prevMovieSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 p-2 rounded-full text-white hover:bg-black/90 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
            )}
            {currentMovieSlide < upcomingMovies.length - 5 && (
              <button
                onClick={nextMovieSlide}
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

export default InfluencerPage;