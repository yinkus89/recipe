import React from 'react';

interface Recipe {
  id: string | number;
  title: string;
  description?: string;
  steps: string[];
  imageURL?: string; // Optional image URL for the recipe
}

interface RecipeCardProps {
  recipe: Recipe;  // This defines the prop type for `recipe`
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="recipe-card border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      {/* Optional Recipe Image */}
      {recipe.imageURL && (
        <img
          src={recipe.imageURL}
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
      )}

      <h3 className="text-xl font-semibold">{recipe.title || 'Untitled Recipe'}</h3>
      
      {/* Description */}
      <p className="text-gray-700 mt-2">
        {recipe.description ? recipe.description : 'No description available'}
      </p>

      <div className="mt-4">
        <h4 className="font-semibold text-lg">Steps:</h4>
        {recipe.steps && recipe.steps.length > 0 ? (
          <ol className="list-decimal pl-6 space-y-2">
            {recipe.steps.map((step, index) => (
              <li key={index} className="text-gray-600">{step}</li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-500">No steps available</p>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
