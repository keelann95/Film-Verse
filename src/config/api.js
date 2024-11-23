export const API_BASE_URL = 'http://127.0.0.1:5555';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/login',
  SIGNUP: '/signup',
  
  // Users
  USER_PROFILE: (id) => `/users/${id}`,
  FOLLOW_USER: (id) => `/follow/${id}`,
  
  // Movies
  POPULAR_MOVIES: '/popular',
  TRENDING_MOVIES: '/trending',
  UPCOMING_MOVIES: '/upcoming',
  MOVIE_DETAILS: (id) => `/movies/${id}/details`,
  
  // TV Series
  TOP_RATED_SERIES: '/top_rated_tv_series',
  SERIES_EPISODES: (seriesId, seasonNumber) => 
    `/tv_series/${seriesId}/season/${seasonNumber}/episodes`,
  
  // Clubs
  MOVIE_CLUBS: '/movie-clubs',
  CLUB_DETAILS: (id) => `/movie-clubs/${id}`,
  CLUB_MEMBERS: (id) => `/movie-clubs/${id}/members`,
  
  // Posts
  POSTS: '/posts',
  POST_COMMENTS: (id) => `/posts/${id}/comments`,
  POST_LIKE: (id) => `/posts/${id}/like`,
  
  // Comments
  COMMENT_LIKE: (id) => `/comments/${id}/like`,
};

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new Error('Session expired. Please login again.');
    }
    throw new Error('Request failed');
  }

  return response.json();
};