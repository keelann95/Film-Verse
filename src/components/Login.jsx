import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Make the login API request
      const response = await fetch('http://127.0.0.1:5555/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
  
      if (!response.ok) {
        // Parse and handle the error response
        const errorText = await response.text();
        console.error('Error response:', errorText);
  
        // Provide a detailed error message
        setError(`Login failed: ${response.status} - ${errorText}`);
        return;
      }
  
      const data = await response.json();
      console.log('Login response data:', data);
      const token = data.token;
      console.log(token);
      
      if (data.success) {
        // Store the token in localStorage
        localStorage.setItem('token', token);
  
        // Optionally store the user info in localStorage as well
        // localStorage.setItem('user', JSON.stringify(data.user)); 

        // Navigate to the desired route (e.g., dashboard or home)
        navigate('/');
      } else {
        // Display the error from the API response
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Detailed Login Error:', error);
      setError('Network error. Please check your connection and try again.');
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-black">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account? Signup
            <Link to="/signup" className="text-blue-600 hover:text-blue-800">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
