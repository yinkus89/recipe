import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavoriteCard from '../components/FavoriteCard';

const FavoritePage: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [highlightedFavoriteId, setHighlightedFavoriteId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/user/favorites', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => setFavorites(response.data))
      .catch(error => console.error('Error fetching favorites:', error));
  }, []);

  const handleFavoriteClick = (id: number) => {
    setHighlightedFavoriteId(id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Your Favorite Recipes</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {favorites.map((favorite) => (
            <FavoriteCard
              key={favorite.id}
              favorite={favorite}
              isHighlighted={highlightedFavoriteId === favorite.id}
              onClick={() => handleFavoriteClick(favorite.id)}
            />
          ))}
        </div>
      ) : (
        <p>You have no favorite recipes.</p>
      )}
    </div>
  );
};


export default FavoritePage;
