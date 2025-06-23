import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Handle login logic here
    console.log('Login attempt:', { username, password });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded mb-4">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Pure Leaf</h2>
          <p className="text-gray-600 text-sm">Your Tea Manufacturing Management System</p>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Login
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="text-center mt-6">
          <a
            href="#"
            className="text-green-600 hover:text-green-700 text-sm font-medium"
            onClick={(e) => {
              e.preventDefault();
              // Handle forgot password logic
              console.log('Forgot password clicked');
            }}
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}