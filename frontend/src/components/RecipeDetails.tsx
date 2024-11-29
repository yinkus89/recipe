import React from 'react';

interface Recipe {
  id: string;
  title: string;
  imageURL?: string; // Optional in case no image is provided
  description?: string; // Optional
  instructions?: string; // Optional
}

const RecipeDetails: React.FC<{ recipe: Recipe | null }> = ({ recipe }) => {
  if (!recipe) {
    return <div className="p-4">No recipe details available.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{recipe.title || 'Untitled Recipe'}</h1>
      <img
        src={recipe.imageURL || 'https://via.placeholder.com/400'}
        alt={recipe.title || 'Recipe'}
        className="w-full h-72 object-cover my-4"
      />
      <p>{recipe.description || 'No description available.'}</p>
      <h2 className="mt-4 text-2xl font-semibold">Instructions</h2>
      <p>{recipe.instructions || 'No instructions provided.'}</p>
    </div>
  );
};

export default RecipeDetails;
