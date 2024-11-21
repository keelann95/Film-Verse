import React, { useState, useEffect } from 'react';
import { CiBookmark } from 'react-icons/ci';
import { FaPlayCircle } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import { useMovieContext } from './MovieProvider';

const MoviePage = () => {
  const { watchlist, likedMovies } = useMovieContext();
  
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [newDiscussionText, setNewDiscussionText] = useState('');
  const [popularDiscussions, setPopularDiscussions] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);  
  
  useEffect(() => {
    const token = localStorage.getItem("authToken");  

    if (!token) {
      setError('Authorization token is missing.');
      setLoading(false);
      return;
    }

    fetch('http://127.0.0.1:5555/posts', {
      method: 'GET', 
      headers: {
        'Authorization': `Bearer ${token}`,  
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data) => {
      setPopularDiscussions(data);  
      setLoading(false);  
    })
    .catch((error) => {
      setError(error.message); 
      setLoading(false); 
    });
  }, []);  
  
  const handlePostDiscussion = () => {
    if (!newDiscussionTitle.trim() || !newDiscussionText.trim()) return;

    const newDiscussion = {
      title: newDiscussionTitle,
      text: newDiscussionText,
      likes: 0,
      comments: 0,
      image: 'https://via.placeholder.com/150', 
    };

    setPopularDiscussions([...popularDiscussions, newDiscussion]);
    setNewDiscussionTitle('');
    setNewDiscussionText('');
  };

  return (
    <div>
      <section
        className="relative w-full h-[80vh]"
        style={{
          backgroundImage: "url(https://www.komar.de/media/catalog/product/cache/5/image/9df78eab33525d08d6e5fb8d27136e95/4/-/4-4126_avengers_infinity_war_movie_poster_web.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 8))",
          zIndex: 10,
        }}></div>
        <div className="relative z-50">
          {/* <Navbar /> */}
        </div>
        <div className='relative z-20 transform translate-y-72 pl-16'>
          <div>
            <h1 className='text-[#fff] text-7xl pt-40 font-serif'>Become best movie influencer</h1>
          </div>
        </div>
      </section>

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

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Post a New Discussion</h2>
        <div className="flex flex-col mb-4">
          <input 
            type="text" 
            placeholder="Discussion Title" 
            value={newDiscussionTitle} 
            onChange={(e) => setNewDiscussionTitle(e.target.value)} 
            className="bg-gray-800 border border-gray-500 p-2 mb-2 rounded"
          />
          <textarea 
            placeholder="Discussion Text" 
            value={newDiscussionText} 
            onChange={(e) => setNewDiscussionText(e.target.value)} 
            className="bg-gray-800 border border-gray-500 p-2 mb-2 rounded" 
            rows="4"
          />
          <button 
            onClick={handlePostDiscussion} 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Post
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Popular Discussions</h2>
        {loading ? (
          <div>Loading discussions...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          popularDiscussions.map((discussion, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center mb-2">
                <img src={discussion.image} alt={discussion.title} className="w-8 h-8 rounded-full mr-2" />
              </div>
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-bold mb-2">{discussion.title}</h3>
                <p className="text-gray-400 mb-2">{discussion.text}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-2">{discussion.likes} Likes</span>
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-gray-400">{discussion.comments} Comments</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MoviePage;
