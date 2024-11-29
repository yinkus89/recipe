import React, { useEffect, useState } from 'react';
import { getRecipes, Recipe } from '../utils/api';  // Import getRecipes and Recipe from api file
import RecipeCard from './RecipeCard';  // RecipeCard component to display individual recipe details

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);  // Typed as Recipe[] (array of recipes)
  const [loading, setLoading] = useState<boolean>(true);  // State to track loading state
  const [error, setError] = useState<string>('');  // State to track error message

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();  // Fetch recipes from the API
        setRecipes(data);  // Update state with fetched recipes
      } catch (err: any) {
        console.error(err);  // Log the error for debugging
        setError('Error fetching recipes');  // Set error message if the API call fails
      } finally {
        setLoading(false);  // Set loading to false once the request is completed
      }
    };

    fetchRecipes();  // Call the fetch function
  }, []);  // Empty dependency array ensures this runs only once after the initial render

  return (
    <div>
      <h2>Recipe List</h2>

      {/* Display loading spinner or text while data is being fetched */}
      {loading && <div className="loading-spinner">Loading...</div>}

      {/* Display error message if there's an issue fetching the data */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Render recipe cards once data is fetched */}
      <ul>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <li key={recipe.id}>
              {/* Pass recipe data to the RecipeCard component */}
              <RecipeCard recipe={recipe} />
            </li>
          ))
        ) : (
          <p>No recipes found</p>  // Display this message if no recipes are returned
        )}
      </ul>
    </div>
  );
};

export default RecipeList;
