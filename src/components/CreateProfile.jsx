import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function CreateProfile() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    password: '',
    profile_picture: 'default_profile_picture.jpg'
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.username || formData.username.length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }
    if (!formData.email || !formData.email.includes('@')) {
      throw new Error('Please enter a valid email address');
    }
    if (!formData.password || formData.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      validateForm();

      const response = await fetch('https://film-verse-backend.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create profile');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      await Swal.fire({
        title: 'Profile Created!',
        text: 'Welcome to Film Verse!',
        icon: 'success',
        confirmButtonColor: '#9333ea',
        timer: 2000,
        timerProgressBar: true
      });

      navigate('/influencer');

    } catch (error) {
      console.error('Profile creation error:', error);
      
      await Swal.fire({
        title: 'Error',
        text: error.message || 'Failed to create profile. Please try again.',
        icon: 'error',
        confirmButtonColor: '#9333ea'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Create Your Profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              required
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Bio
            </label>
            <textarea
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 h-32 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
            />
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`
                bg-purple-600 text-white px-8 py-3 rounded-lg font-medium
                hover:bg-purple-700 transition-colors
                flex items-center justify-center min-w-[160px]
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isLoading ? 'Creating...' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}