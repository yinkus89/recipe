// src/components/UserProfile.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.user) {
          setUser(response.data.user); // Assuming user data is under response.data.user
        } else {
          setError('User profile not available.');
        }
      } catch (err: any) {
        // Handling different errors
        if (err.response?.status === 401) {
          setError('Session expired. Please log in again.');
        } else {
          setError('Error fetching user profile. Please try again.');
        }
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect user to login page
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="spinner">Loading...</div> {/* You can replace this with a spinner component */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      {user ? (
        <div>
          <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
          <div className="mb-4">
            <p className="font-medium">Name: <span className="text-gray-700">{user.name}</span></p>
            <p className="font-medium">Email: <span className="text-gray-700">{user.email}</span></p>
            {/* Optionally, you can add more fields like profile picture, etc. */}
          </div>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default UserProfile;
