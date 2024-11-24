import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showAuthRequired, showSuccessToast, showErrorAlert } from '../utils/alert';
import Navbar from './Navbar';

const CreateClub = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    genre_id: ''
  });
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        showAuthRequired();
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('https://film-verse-backend.onrender.com/genres', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            showAuthRequired();
            navigate('/login');
            return;
          }
          throw new Error('Failed to fetch genres');
        }

        const data = await response.json();
        setGenres(data);
      } catch (err) {
        console.error('Error fetching genres:', err);
        showErrorAlert('Failed to load genres');
      }
    };

    fetchGenres();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      showAuthRequired();
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://film-verse-backend.onrender.com/movie-clubs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        if (response.status === 401) {
          showAuthRequired();
          navigate('/login');
          return;
        }
        throw new Error('Failed to create club');
      }

      const data = await response.json();
      showSuccessToast('Club created successfully');
      navigate(`/clubs/${data.id}`);
    } catch (err) {
      console.error('Error creating club:', err);
      showErrorAlert('Failed to create club');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create a New Club</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Club Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="Enter club name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 h-32 resize-none"
                placeholder="Describe your club..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Genre
              </label>
              <select
                value={formData.genre_id}
                onChange={(e) => setFormData({ ...formData, genre_id: e.target.value })}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                required
              >
                <option value="">Select a genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
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
              {loading ? 'Creating...' : 'Create Club'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClub;
