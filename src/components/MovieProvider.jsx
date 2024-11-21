import React, { createContext, useState, useContext } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);

  const addToWatchlist = (movie) => {
    const isAlreadyInWatchlist = watchlist.some(
      (item) => 
        (item.movie_name === movie.movie_name || item.title === movie.title) &&
        (item.backgroundImage === movie.backgroundImage)
    );

    if (!isAlreadyInWatchlist) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (movie) => {
    setWatchlist(watchlist.filter(
      (item) => 
        !(item.movie_name === movie.movie_name && item.backgroundImage === movie.backgroundImage)
    ));
  };

  const addToLikedMovies = (movie) => {
    // Check if movie is already liked
    const isAlreadyLiked = likedMovies.some(
      (item) => 
        (item.movie_name === movie.movie_name || item.title === movie.title) &&
        (item.backgroundImage === movie.backgroundImage)
    );

    if (!isAlreadyLiked) {
      setLikedMovies([...likedMovies, movie]);
    }
  };

  const removeFromLikedMovies = (movie) => {
    setLikedMovies(likedMovies.filter(
      (item) => 
        !(item.movie_name === movie.movie_name && item.backgroundImage === movie.backgroundImage)
    ));
  };

  return (
    <MovieContext.Provider
      value={{
        watchlist,
        likedMovies,
        addToWatchlist,
        removeFromWatchlist,
        addToLikedMovies,
        removeFromLikedMovies
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};