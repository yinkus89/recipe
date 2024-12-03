import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  // API URL from environment variables
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  // Simple email validation
  const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    if (!isEmailValid(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', token);

      // Show success message
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500); // Delay redirect for UX
      setEmail(''); // Clear email field
      setPassword(''); // Clear password field
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {/* Error and Success Messages */}
        {error && (
          <div
            className="mb-4 p-3 text-red-700 bg-red-100 rounded"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="mb-4 p-3 text-green-700 bg-green-100 rounded"
            role="alert"
            aria-live="polite"
          >
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
              aria-describedby={error ? "email-error" : undefined}
            />
            {error && <p id="email-error" className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
              aria-describedby={error ? "password-error" : undefined}
            />
            {error && <p id="password-error" className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin">Logging in...</span> // You can replace this with an actual spinner
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
