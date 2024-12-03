import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../utils/api';

const CreateRecipe: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState<string[]>(['']);
  const [imageURL, setImageURL] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const userId = 1;  // Replace with actual user ID (from logged-in user)

  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleRemoveStep = (index: number) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (tags.includes(value)) return; // Avoid duplicate tags
    setTags([...tags, value]);
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const instructions = steps.join('\n');
      await createRecipe({
        title,
        description,
        instructions,
        imageURL,
        category,
        ingredients,
        tags,
        userId,
      });
      navigate('/recipes');
    } catch (error) {
      console.error('Error creating recipe:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 font-medium">Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Add Ingredient
          </button>
        </div>

        {/* Steps */}
        <div>
          <label className="block text-gray-700 font-medium">Steps:</label>
          {steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveStep(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddStep}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Add Step
          </button>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 font-medium">Tags:</label>
          <input
            type="text"
            onChange={handleTagChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add tags (comma separated)"
          />
          <div className="flex flex-wrap space-x-2 mt-2">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 flex items-center">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-red-500"
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-700 font-medium">Image URL:</label>
          <input
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          {isSubmitting ? 'Submitting...' : 'Create Recipe'}
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
