import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get the id from the URL

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const popularResponse = await fetch('https://film-verse-backend.onrender.com/popular');
        const popularMovies = await popularResponse.json();

        const foundMovie = popularMovies.find(
          (m) => 
            m.id === id || 
            m.movie_name.toLowerCase().replace(/\s+/g, '-') === id
        );

        if (foundMovie) {
          const movieDetails = {
            id: foundMovie.id || id,
            movie_name: foundMovie.movie_name || "Untitled Movie",
            runtime: foundMovie.runtime || "Unknown",
            release_date: foundMovie.release_date || "Unknown",
            genres: Array.isArray(foundMovie.genres) 
              ? foundMovie.genres 
              : (foundMovie.name ? [foundMovie.name] : ["Unknown"]),
            overview: foundMovie.overview || "No description available",
            backgroundImage: foundMovie.movie_picture || "/api/placeholder/1920/1080",
            posterImage: foundMovie.poster_path || foundMovie.movie_picture || "/api/placeholder/400/600",
            rating: foundMovie.rating || "N/A",
            cast: foundMovie.cast || [],
            director: foundMovie.director || "Unknown",
            trailer: foundMovie.trailer || null
          };

          setMovie(movieDetails);
        } else {
          throw new Error('Movie not found');
        }
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]); 

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Oops! Something went wrong</h1>
          <p className="text-xl">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <h1 className="text-4xl">Movie Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${movie.backgroundImage})`,
            filter: 'blur(10px)'
          }}
        />

        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img 
                src={movie.posterImage} 
                alt={movie.movie_name} 
                className="w-full rounded-lg shadow-2xl"
              />
            </div>

            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{movie.movie_name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="flex items-center">
                  <span className="text-yellow-400 mr-2">⭐</span>
                  {movie.rating}
                </span>
                <span>•</span>
                <span>{movie.runtime}</span>
                <span>•</span>
                <span>{movie.release_date}</span>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Genres</h3>
                <div className="flex space-x-2">
                  {movie.genres.map((genre, index) => (
                    <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Overview</h3>
                <p className="text-gray-300">{movie.overview}</p>
              </div>
              <div className="flex space-x-4 mt-6">
                <button className="bg-green-600 px-6 py-3 rounded-lg">Watch Now</button>
                <button className="border border-white/30 px-6 py-3 rounded-lg">Add to Watchlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
