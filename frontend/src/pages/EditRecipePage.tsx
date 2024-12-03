import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById } from '../utils/api'; // Ensure to import the necessary API functions

const EditRecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the recipe ID from the URL
  const navigate = useNavigate();
  
  // State for the form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: 0, unit: '' }]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState<string | null>(null);

  // Fetch the recipe data on component mount
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        if (id) {
          const recipe = await getRecipeById(id);
          setTitle(title);
          setDescription(description);
          setInstructions(instructions);
          setImageURL(imageURL);
          setCategory(category);
          setIngredients(ingredients);
          setTags(tags);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError('Failed to fetch recipe data');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error

    const recipeData = {
      title,
      description,
      instructions,
      imageURL,
      category,
      ingredients,
      tags,
    };

    try {
      setLoading(true);
      const updatedRecipe = await (recipeData);
      if (updatedRecipe) {
        alert('Recipe updated successfully!');
        navigate(`/recipes/${id}`); // Redirect to the updated recipe details page
      }
    } catch (error) {
      setError('Failed to update recipe');
      console.error('Error updating recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Edit Recipe</h2>
      {error && <p className="mb-4 text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Title */}
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

        {/* Description */}
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

        {/* Instructions */}
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

        {/* Image URL */}
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

        {/* Category */}
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

        {/* Ingredients */}
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

        {/* Tags */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Recipe'}
        </button>
      </form>
    </div>
  );
};

export default EditRecipePage;
