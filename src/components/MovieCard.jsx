import React from 'react';

const DEFAULT_MOVIE_POSTER = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80';

const MovieCard = ({ movie, onWatchNow }) => {
  const handleWatchClick = (e) => {
    e.preventDefault();
    onWatchNow(movie);
  };

  return (
    <div className="relative group flex-shrink-0 w-1/5">
      <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden h-full">
        <img
          src={movie.movie_picture || DEFAULT_MOVIE_POSTER}
          alt={movie.movie_name}
          className="w-full aspect-[2/3] object-cover"
          onError={(e) => {
            e.target.src = DEFAULT_MOVIE_POSTER;
          }}
        />
        <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-white">{movie.movie_name}</h4>
            <div className="flex items-center">
              <span className="text-yellow-400 font-semibold">
                ★ {movie.rating?.toFixed(1) || 'N/A'}/10
              </span>
            </div>
            <p className="text-gray-300 text-sm line-clamp-3">{movie.overview}</p>
          </div>
          <button
            onClick={handleWatchClick}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded-lg transition-colors mt-4"
          >
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;