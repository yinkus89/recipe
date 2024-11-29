import axios from 'axios';

// Base URL for your API (update it based on your backend API URL)
const API_URL = 'http://localhost:5432/auth';

// Helper to get token from localStorage
const getToken = () => localStorage.getItem('token');

// Register user function
export const registerUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data; // The response may contain user data or success message
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Login user function
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token); // Save token to localStorage
    }
    return token; // Return the JWT token on successful login
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Get user profile function
export const getUserProfile = async () => {
  const token = getToken();
  if (!token) {
    throw new Error('No token found, please log in.');
  }

  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return user data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};

// Logout function (removes token from localStorage)
export const logout = () => {
  localStorage.removeItem('token');
};
