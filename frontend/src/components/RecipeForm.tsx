import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [highlightCreateRecipe, setHighlightCreateRecipe] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/recipes', { title, ingredients, steps });
      window.location.href = '/recipes';
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <h2 className={`text-2xl font-semibold mb-6 ${highlightCreateRecipe ? 'text-green-500' : ''}`}>
        Create Recipe
      </h2>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <label>Ingredients:</label>
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <label>Steps:</label>
      <input
        type="text"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        type="submit"
        onMouseEnter={() => setHighlightCreateRecipe(true)}
        onMouseLeave={() => setHighlightCreateRecipe(false)}
        className="w-full p-2 bg-blue-600 text-white"
      >
        Create Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
