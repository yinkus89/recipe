// src/pages/Home.tsx
import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import "../styles/tailwind.css";

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating data fetching or initializing logic
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset any previous error
        // Simulate your API call or data fetching here
        // Example: await fetchRecipes();
      } catch (err) {
        setError("Something went wrong while fetching the recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Welcome to the Recipe App!
        </h1>

        {loading ? (
          <div className="text-center py-4 text-gray-600">Loading recipes...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <RecipeList />
        )}
      </div>
    </div>
  );
};

export default Home;

