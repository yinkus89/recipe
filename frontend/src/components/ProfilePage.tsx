import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../service/authService';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data.user);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return user ? (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  ) : (
    <p>Loading profile...</p>
  );
};

export default Profile;
