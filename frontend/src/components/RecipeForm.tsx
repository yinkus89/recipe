import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecipeForm: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: 0, unit: '' }]);
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);  // Loading state

  // Ingredient handling
  const handleIngredientChange = (index: number, field: string, value: string | number) => {
    const newIngredients = [...ingredients];
    if (field === 'quantity') {
      newIngredients[index] = { ...newIngredients[index], [field]: isNaN(Number(value)) ? 0 : Number(value) };
    } else {
      newIngredients[index] = { ...newIngredients[index], [field]: value };
    }
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: 0, unit: '' }]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation before submitting
    if (!title || !description || !instructions || !category || ingredients.some(ingredient => !ingredient.name || !ingredient.quantity || !ingredient.unit)) {
      setError('Please fill out all fields and ingredients.');
      return;
    }

    const recipeData = {
      title,
      description,
      instructions,
      imageURL,
      category,
      ingredients,
      tags,
      userId: 1, // User ID should come from auth context or session
    };

    setLoading(true);  // Set loading state

    try {
      const response = await axios.post('http://localhost:5000/api/recipes', recipeData);
      if (response.status === 201) {
        alert('Recipe created successfully!');
        resetForm();  // Clear the form after successful submission
        navigate('/recipes');
      }
    } catch (error) {
      console.error('Full error object:', error); // Log the full error to understand more
      if (error.response) {
        // Server responded with an error
        setError(`Failed to create the recipe: ${error.response.data.error || 'Unknown error from server'}`);
      } else if (error.request) {
        // No response from the server
        setError('No response from server. Please check your connection.');
      } else {
        // Error in setting up the request
        setError(`Error setting up request: ${error.message}`);
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Reset form fields
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setInstructions('');
    setImageURL('');
    setCategory('');
    setIngredients([{ name: '', quantity: 0, unit: '' }]);
    setTags([]);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Create Recipe</h2>
      {error && <p className="mb-4 text-red-500">{error}</p>}

      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-medium">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 font-medium">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="instructions" className="block mb-2 font-medium">Instructions:</label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="imageURL" className="block mb-2 font-medium">Image URL (optional):</label>
        <input
          type="text"
          id="imageURL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block mb-2 font-medium">Category:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Ingredients:</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex space-x-4 mb-2">
            <input
              type="text"
              placeholder="Name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
              className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Unit"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="text-red-500 p-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Add Ingredient
        </button>
      </div>

      <div className="mb-4">
        <label htmlFor="tags" className="block mb-2 font-medium">Tags (optional):</label>
        <input
          type="text"
          id="tags"
          value={tags.join(', ')}
          onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className={`w-full bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Create Recipe'}
      </button>
    </form>
  );
};

export default RecipeForm;
