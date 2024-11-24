import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast, showErrorAlert } from '../utils/alert';
import Navbar from './Navbar';
import Footer from './Footer';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    movie_id: '',
  });
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://film-verse-backend.onrender.com/popular');
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        console.error('Error fetching movies:', err);
        showErrorAlert('Failed to load movies');
      }
    };

    fetchMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      showErrorAlert('Please login to create a post');
      navigate('/login');
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      showErrorAlert('Title and content are required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://film-verse-backend.onrender.com/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create post');
      }

      showSuccessToast('Post created successfully');
      navigate('/forum');
    } catch (err) {
      console.error('Error creating post:', err);
      showErrorAlert(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create a New Post</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="Enter post title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Movie
              </label>
              <select
                value={formData.movie_id}
                onChange={(e) => setFormData({ ...formData, movie_id: e.target.value })}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="">Select a movie (optional)</option>
                {movies.map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.movie_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 h-32 resize-none"
                placeholder="Write your thoughts about the movie..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-3 bg-purple-600 text-white font-semibold rounded-lg
                hover:bg-purple-700 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
