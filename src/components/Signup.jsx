import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('https://film-verse-backend.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      const responseData = await response.json();
      setLoading(false);

      if (response.ok) {
        setMessage('Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        // Handling different error messages from the backend
        if (responseData.error) {
          setMessage(responseData.error);
        } else {
          setMessage('Signup failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setLoading(false);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-black">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer" onClick={() => navigate('/login')}>
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
