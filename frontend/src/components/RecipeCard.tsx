// In src/components/RecipeCard.tsx
import React from 'react';
import { Recipe } from '../utils/api'; // Import the Recipe type from where it's defined

interface RecipeCardProps {
  recipe: Recipe;  // Define the recipe prop with the correct type
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      {/* Render other properties of the recipe */}
    </div>
  );
};

export default RecipeCard;
