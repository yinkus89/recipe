import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../service/authService';  // Assuming authService handles the profile fetching

interface User {
  name: string;
  email: string;
  // Add other user details if necessary
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);  // Define the user type explicitly
  const [error, setError] = useState<string>('');  // Explicit type for error
  const [loading, setLoading] = useState<boolean>(true);  // Type for loading

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data.user);
      } catch (err: any) {
        // Handle different types of errors (e.g., network, unauthorized)
        if (err.response && err.response.status === 401) {
          setError('You are not authorized to view this profile. Please log in.');
        } else {
          setError('An error occurred while fetching your profile. Please try again.');
        }
      } finally {
        setLoading(false);  // Stop loading when the request completes
      }
    };

    fetchProfile();
  }, []);

  // Loading state
  if (loading) return <p>Loading profile...</p>;

  // Error state
  if (error) return <p className="text-red-500">{error}</p>;  // Styling error in red

  return user ? (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Welcome, {user.name}!</h1>
      <p className="text-gray-700 mt-2">Email: {user.email}</p>
    </div>
  ) : (
    <p>No user data available. Please try again later.</p>  // Fallback message if user is null
  );
};

export default Profile;
