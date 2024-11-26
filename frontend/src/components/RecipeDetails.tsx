// src/components/RecipeDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipes } from "../api";
import "../styles/tailwind.css";

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRecipe = async () => {
      setLoading(true);
      setError(null);

      try {
        const recipeData = await fetchRecipes(); // Fetch from backend
        const selectedRecipe = recipeData.find((r: any) => r.id === Number(id));
        if (selectedRecipe) {
          setRecipe(selectedRecipe);
        } else {
          setError("Recipe not found.");
        }
      } catch (err) {
        setError("Error fetching recipe.");
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    };

    getRecipe();
  }, [id]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        {recipe?.title}
      </h2>
      <img
        src={recipe?.imageURL}
        alt={recipe?.title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <p className="text-gray-600 text-lg mb-4">{recipe?.description}</p>
      <h4 className="text-xl font-semibold text-gray-800 mb-2">
        Instructions:
      </h4>
      <p className="text-gray-600 text-lg">{recipe?.instructions}</p>
    </div>
  );
};

export default RecipeDetails;
