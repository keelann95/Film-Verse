import  { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer'
import { useMovieContext } from './MovieProvider'; 


import { Play, Plus,  Share2 } from 'react-feather'; 
import Navbar from './Navbar';

const MovieDetails = () => {
  const location = useLocation();
  const movie = location.state;
  const navigate = useNavigate();
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const limit = 10;
  const skip = 10;
  

  
  

  useEffect(() => {
    console.log("Movie data received:", movie); // Debug log
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
        const response = await fetch('http://127.0.0.1:5555/upcoming');
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


  
  const handleeMovieClick = (movie) => {
    
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
  
  const { 
    watchlist, 
    likedMovies, 
    addToWatchlist, 
    removeFromWatchlist, 
    addToLikedMovies, 
    removeFromLikedMovies 
  } = useMovieContext();

 
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
   
    setIsWatchlisted(
      watchlist.some(item => 
        (item.movie_name === movie?.movie_name || item.title === movie?.title) &&
        (item.backgroundImage === movie?.backgroundImage)
      )
    );
    setIsLiked(
      likedMovies.some(item => 
        (item.movie_name === movie?.movie_name || item.title === movie?.title) &&
        (item.backgroundImage === movie?.backgroundImage)
      )
    );
  }, [movie, watchlist, likedMovies]);

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
        const response = await fetch('http://127.0.0.1:5555/upcoming');
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

  const handleWatchlistToggle = () => {
    if (isWatchlisted) {
      removeFromWatchlist(movie);
      setIsWatchlisted(false);
    } else {
      addToWatchlist(movie);
      setIsWatchlisted(true);
    }
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      removeFromLikedMovies(movie);
      setIsLiked(false);
    } else {
      addToLikedMovies(movie);
      setIsLiked(true);
    }
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

            <div className="flex flex-wrap gap-4 justify-between">
            <button 
      onClick={handleWatchlistToggle}
      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-medium transition-colors"
    >
      <Plus className="w-5 h-5" />
      {isWatchlisted ? 'Remove Watchlist' : 'Add Watchlist'}
    </button>

    <button 
      onClick={handleLikeToggle}
      className={`flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-medium transition-colors ${
        isLiked ? 'bg-red-500' : 'bg-white/10'
      }`}
    >
      <span className="w-5 h-5">❤️</span>
      {isLiked ? 'Liked' : 'Like'}
    </button>
            </div>
          </div>
        </div>
      </div>



        <header className="p-4 sm:p-8 text-2xl font-semibold pl-4 sm:pl-16">
          Just Released
        </header>
        <section className="flex overflow-x-auto space-x-4 px-4 sm:px-16 pb-4 scrollbar-hide">
          {upcomingMovies.map((movie, index) => (
            <div 
              key={index}
              onClick={() => handleMovieClick(movie)}
              className="cursor-pointer flex-shrink-0 group hover:scale-105 transition-transform duration-200"
            >
              <div className="w-64 sm:w-72 md:w-80 lg:w-96 h-64 sm:h-80 rounded-lg overflow-hidden">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <img
                    className="rounded-lg w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-200"
                    src={movie.posterImage || "/api/placeholder/400/600"}
                    alt={movie.movie_name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h1 className="text-lg sm:text-xl font-semibold font-serif">
                        {movie.movie_name}
                      </h1>
                      <div className="flex items-center text-gray-400 gap-2 text-sm">
                        <span>⭐</span>
                        <span>{movie.rating || "N/A"}</span>
                        <span>|</span>
                        <div className="flex flex-wrap gap-1">
                          {movie.genres?.map((genre, i) => (
                            <span key={i} className="whitespace-nowrap">
                              {genre}
                              {i < movie.genres.length - 1 && ' | '}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>


    <Footer />
    </div>
  );
};

export default MovieDetails;
