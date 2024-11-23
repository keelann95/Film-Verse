import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Plus, Share2, Star } from 'lucide-react';
import Navbar from './Navbar';
import { showMovieUnavailable } from '../utils/alert';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5555/movies/${id}/details`);
        if (!response.ok) throw new Error('Failed to fetch movie details');
        const data = await response.json();
        
        setMovie(data.movie);
        setActors(data.actors);
        setSimilarMovies(data.similar_movies);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Loading movie details...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-red-500 text-xl">Movie not found</div>
      </div>
    );
  }

  const handleWatchTrailer = () => {
    if (movie.video) {
      window.open(movie.video, '_blank');
    } else {
      showMovieUnavailable();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        className="relative h-[70vh] w-full"
        style={{
          backgroundImage: `url(${movie.movie_picture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/50"></div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {movie.movie_name}
            </h1>
            
            <div className="flex items-center space-x-4 text-gray-300 mb-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-1" />
                <span>{movie.rating}/10</span>
              </div>
              <span>•</span>
              <span>{movie.runtime} min</span>
              <span>•</span>
              <span>{movie.release_date}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map((genre, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-800/80 rounded-full text-sm text-gray-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 mb-8 line-clamp-3 md:line-clamp-none">
              {movie.overview}
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleWatchTrailer}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Play className="w-5 h-5" />
                Watch Trailer
              </button>
              <button
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add to Watchlist
              </button>
              <button
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {actors.map((actor) => (
            <div key={actor.id} className="group">
              <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2">
                <img
                  src={actor.picture || 'https://via.placeholder.com/300x450'}
                  alt={actor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium text-white">{actor.name}</h3>
              <p className="text-sm text-gray-400">{actor.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Movies Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Similar Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {similarMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="group cursor-pointer"
            >
              <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2">
                <img
                  src={movie.movie_picture || 'https://via.placeholder.com/300x450'}
                  alt={movie.movie_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium text-white group-hover:text-purple-400 transition-colors">
                {movie.movie_name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{movie.rating}/10</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;