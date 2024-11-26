// src/components/FavoriteList.tsx
import React, { useEffect, useState } from "react";
import { fetchFavorites } from "../api"; // Import the fetch function
import RecipeCard from "./RecipeCard"; // Assuming you have a RecipeCard component to display recipes
import "../styles/tailwind.css";

const FavoriteList: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]); // Store fetched favorites

  useEffect(() => {
    // Fetch the favorite recipes when the component mounts
    const fetchFavoriteRecipes = async () => {
      try {
        const data = await fetchFavorites();
        setFavorites(data); // Set the data into the state
      } catch (error) {
        console.error("Failed to fetch favorite recipes:", error);
      }
    };

    fetchFavoriteRecipes(); // Call the function to fetch data
  }, []); // Empty dependency array to call the function once when the component mounts

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        Your Favorite Recipes
      </h2>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe: any) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          You don't have any favorite recipes yet!
        </p>
      )}
    </div>
  );
};

export default FavoriteList;
