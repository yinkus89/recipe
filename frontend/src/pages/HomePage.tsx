import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const HomePage: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [highlightedRecipeId, setHighlightedRecipeId] = useState<number | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const handleRecipeClick = (id: number) => {
    setHighlightedRecipeId(id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Featured Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => handleRecipeClick(recipe.id)}
            className={`cursor-pointer ${highlightedRecipeId === recipe.id ? 'border-4 border-blue-500' : ''}`}
          >
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
