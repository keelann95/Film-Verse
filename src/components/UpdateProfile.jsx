import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast, showErrorAlert } from '../utils/alert';
import Navbar from './Navbar';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    profile_picture: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (!token || !userId) {
        showErrorAlert('Please login to update your profile');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:5555/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            showErrorAlert('Session expired. Please login again');
            navigate('/login');
            return;
          }
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setFormData({
          username: data.username || '',
          email: data.email || '',
          bio: data.bio || '',
          profile_picture: data.profile_picture || ''
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        showErrorAlert('Failed to load profile');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      showErrorAlert('Please login to update your profile');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5555/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          bio: formData.bio,
          profile_picture: formData.profile_picture || undefined
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          showErrorAlert('Session expired. Please login again');
          navigate('/login');
          return;
        }
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      
      // Update local storage with new user data
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      showSuccessToast('Profile updated successfully');
      navigate('/');
    } catch (err) {
      console.error('Error updating profile:', err);
      showErrorAlert(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Update Profile</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 h-32 resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Profile Picture URL
              </label>
              <input
                type="url"
                value={formData.profile_picture}
                onChange={(e) => setFormData({ ...formData, profile_picture: e.target.value })}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="Enter image URL"
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
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;