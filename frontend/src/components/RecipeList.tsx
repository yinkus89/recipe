import React, { useEffect, useState } from "react";
import { fetchRecipes } from "../utils/api";
import "../styles/tailwind.css";

interface Recipe {
  id: number;
  title: string;
  description: string;
  instructions: string;
  category: string;
  imageURL: string;
}

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Default image if recipe imageURL is missing
  const defaultImage = 'https://via.placeholder.com/150';  

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      setError(null); // Reset any previous errors
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (err) {
        setError("Error fetching recipes.");
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={recipe.imageURL || defaultImage}  // Use default image if no URL
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {recipe.title}
            </h3>
            <p className="text-gray-600 mb-2">{recipe.description}</p>
            <p className="text-gray-700 mb-4">{recipe.instructions}</p>
            <p className="text-sm text-gray-500">
              <strong>Category:</strong> {recipe.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
