import React, { createContext, useContext, useState } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);

  const addToWatchlist = (movie) => {
    setWatchlist(prev => {
      if (prev.some(m => m.movie_name === movie.movie_name || m.title === movie.title)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFromWatchlist = (movie) => {
    setWatchlist(prev => 
      prev.filter(m => 
        (m.movie_name !== movie.movie_name) && (m.title !== movie.title)
      )
    );
  };

  const addToLikedMovies = (movie) => {
    setLikedMovies(prev => {
      if (prev.some(m => m.movie_name === movie.movie_name || m.title === movie.title)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFromLikedMovies = (movie) => {
    setLikedMovies(prev => 
      prev.filter(m => 
        (m.movie_name !== movie.movie_name) && (m.title !== movie.title)
      )
    );
  };

  return (
    <MovieContext.Provider value={{
      watchlist,
      likedMovies,
      addToWatchlist,
      removeFromWatchlist,
      addToLikedMovies,
      removeFromLikedMovies
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};