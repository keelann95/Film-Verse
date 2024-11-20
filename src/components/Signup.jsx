
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-black">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?Login
            <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
