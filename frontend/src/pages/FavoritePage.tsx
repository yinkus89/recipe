import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavoriteCard from '../components/FavoriteCard';

// Define the type of a single favorite recipe
interface FavoriteRecipe {
  id: number;
  title: string;
  description: string;
  imageURL: string;
  // Add other fields as needed
}

const FavoritePage: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [highlightedFavoriteId, setHighlightedFavoriteId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/user/favorites', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(response.data);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to load favorites.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleFavoriteClick = (id: number) => {
    setHighlightedFavoriteId(id);
  };

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Your Favorite Recipes</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Your Favorite Recipes</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Your Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <p>You have no favorite recipes.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          
        </div>
      )}
    </div>
  
  );
};

export default FavoritePage;
