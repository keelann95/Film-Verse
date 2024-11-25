import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer'
import { useMovieContext } from './MovieProvider';
import { Play, Plus, Share2 } from 'react-feather';
import Navbar from './Navbar';

const MovieDetails = () => {
  const location = useLocation();
  const movie = location.state;
  const navigate = useNavigate();
  const { 
    watchlist, 
    likedMovies, 
    addToWatchlist, 
    removeFromWatchlist,
    addToLikedMovies,
    removeFromLikedMovies 
  } = useMovieContext();
  
  const [isWatchlisted, setIsWatchlisted] = useState(
    watchlist.some(m => m.movie_name === movie?.movie_name || m.title === movie?.title)
  );
  const [isLiked, setIsLiked] = useState(
    likedMovies.some(m => m.movie_name === movie?.movie_name || m.title === movie?.title)
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const limit = 10;
  const skip = 10;

  useEffect(() => {
    console.log("Movie data received:", movie);
  }, [movie]);

  const handleWatchlistToggle = () => {
    if (isWatchlisted) {
      removeFromWatchlist(movie);
    } else {
      addToWatchlist(movie);
    }
    setIsWatchlisted(!isWatchlisted);
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      removeFromLikedMovies(movie);
    } else {
      addToLikedMovies(movie);
    }
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    console.log("Movie data received:", movie);
  }, [movie]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <h1 className="text-2xl text-white">Loading movie details...</h1>
      </div>
    );
  }

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await fetch('https://film-verse-backend.onrender.com/upcoming');
        const data = await response.json();
  
        const transformedUpcomingMovies = data.map((movie) => ({
          movie_name: movie.movie_name,
          rating: movie.rating || "N/A",
          genres: movie.name || [],
          posterImage: movie.movie_picture || "/api/placeholder/1920/1080",
        }));
  
        const limitedAndSkippedUpcomingMovies = transformedUpcomingMovies.slice(skip, skip + limit);
        setUpcomingMovies(limitedAndSkippedUpcomingMovies); 
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };
  
    fetchUpcomingMovies();
  }, []);


  
  const handleMovieClick = (movie) => {
    const movieData = {
      movie_name: movie.movie_name || movie.title, 
      title: movie.movie_name || movie.title,  
      backgroundImage: movie.posterImage || movie.backgroundImage || "/api/placeholder/1920/1080",  
      posterUrl: movie.posterImage || movie.backgroundImage || "/api/placeholder/1920/1080",  
      rating: movie.rating,
      runtime: movie.runtime,
      release_date: movie.release_date,
      genres: movie.name,
      overview: movie.overview
    };
  
    navigate(`/movie/${encodeURIComponent(movie.movie_name || movie.title)}`, {
      state: movieData
    });
  };
  

  return (
    <div className="min-h-screen bg-gray-900">
      
      <div 
        className="relative h-[70vh] w-full"
        style={{
          backgroundImage: `url(${movie.backgroundImage || movie.posterUrl || "/api/placeholder/1920/1080"})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
         <div className="w-full absolute z-50">
        <Navbar />
      </div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)"
          }}
        ></div>
        
        <div className="relative z-10 h-full container mx-auto px-4 flex items-end pb-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {movie.movie_name || movie.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-300 mb-6">
              <span>⭐ {movie.rating || "N/A"}</span>
              {movie.runtime && (
                <>
                  <span>•</span>
                  <span>{movie.runtime}</span>
                </>
              )}
              {movie.release_date && (
                <>
                  <span>•</span>
                  <span>{movie.release_date}</span>
                </>
              )}
            </div>
            
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

<div className="flex flex-wrap gap-4 justify-a">
       
      
        <button 
          onClick={handleWatchlistToggle}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          {isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </button>

     

        <button 
          onClick={handleLikeToggle}
          className={`flex items-center gap-2 ${
            isLiked ? 'bg-red-500' : 'bg-white/10'
          } hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-medium transition-colors`}
        >
          <span className="w-5 h-5">❤️</span>
          {isLiked ? 'Liked' : 'Like'}
        </button>
      </div>
          </div>
        </div>
      </div>



      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Watchlist</h2>
        <div className="grid grid-cols-5 gap-4">
          {watchlist.map((movie, index) => (
            <div key={index} className="flex flex-col items-center">
              <img 
                src={movie.backgroundImage || movie.posterUrl || "/api/placeholder/150/225"} 
                alt={movie.movie_name || movie.title} 
                className="w-full h-auto mb-2" 
              />
              <h3 className="text-center">{movie.movie_name || movie.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Liked Movies</h2>
        <div className="grid grid-cols-5 gap-4">
          {likedMovies.map((movie, index) => (
            <div key={index} className="flex flex-col items-center">
              <img 
                src={movie.backgroundImage || movie.posterUrl || "/api/placeholder/150/225"} 
                alt={movie.movie_name || movie.title} 
                className="w-full h-auto mb-2" 
              />
              <h3 className="text-center">{movie.movie_name || movie.title}</h3>
            </div>
          ))}
        </div>
      </div>


    <Footer />
    </div>
  );
};

export default MovieDetails;
