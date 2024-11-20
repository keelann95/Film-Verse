import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateProfile() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    profile_picture: 'default_profile_picture.jpg'
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize the navigate function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://film-verse-backend.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          password: 'temporaryPassword123' // Placeholder password
        })
      });

      // Check if the response is OK before trying to parse JSON
      if (!response.ok) {
        // Try to parse error message, but handle cases where parsing might fail
        let errorMessage = 'Profile creation failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If JSON parsing fails, use status text
          errorMessage = response.statusText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      // Only try to parse JSON if the response is successful
      const data = await response.json();

      console.log('Profile created:', data);
      
      // Redirect to home page after successful profile creation
      navigate('/profile'); // Redirect to the home page

    } catch (err) {
      setError(err.message);
      console.error('Profile creation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-dark-light p-8 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold tracking-wide">CREATE PROFILE</h2>
        <button className="text-gray-400 hover:text-white">Cancel</button>
      </div>

      {error && (
        <div className="bg-red-600 text-white p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Username</label>
          <input
            type="text"
            required
            className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-black focus:border-primary focus:ring-1 focus:ring-primary"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Email</label>
          <input
            type="email"
            required
            className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-black focus:border-primary focus:ring-1 focus:ring-primary"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Bio</label>
          <textarea
            className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-black h-32 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-primary text-dark px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Creating...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}
