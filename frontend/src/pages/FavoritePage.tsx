// src/pages/FavoritePage.tsx
import React, { useState, useEffect } from "react";
import FavoriteList from "../components/FavoriteList"; // Import FavoriteList component
import "../styles/tailwind.css";

const FavoritePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading of favorites (replace with actual API call if needed)
    const fetchFavorites = async () => {
      try {
        // Simulate a fetch request or make your API call here
        setLoading(true);
        setError(null); // Reset any previous errors
        // await yourApiCallToFetchFavorites();
      } catch (err) {
        setError("Error fetching your favorites.");
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <div className="text-center py-4">Loading your favorites...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-semibold text-gray-900 mb-6">Your Favorites</h1>
      <FavoriteList />
    </div>
  );
};

export default FavoritePage;
