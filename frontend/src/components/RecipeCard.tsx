import React from "react";
import "../styles/tailwind.css";

interface Recipe {
  id: number;
  title: string;
  description: string;
  imageURL: string;
}

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white p-4 m-4">
      <img
        src={recipe.imageURL}
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {recipe.title}
      </h3>
      <p className="text-gray-600 text-sm">{recipe.description}</p>
    </div>
  );
};

export default RecipeCard;
