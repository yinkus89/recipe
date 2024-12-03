import axios from 'axios';

// Define the base URL for your backend API
const BASE_URL = 'http://localhost:5000/api/'; // Replace with your actual backend URL

// Axios instance to set up default settings
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Users API
export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Rethrow the error for the calling function to handle
  }
};

export const createUser = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
export const getRecipeById = async (id: string) => {
  try {
    const response = await api.get(`/recipes/${id}`); // Ensure correct typing
    return response.data; // Return the recipe data directly
  } catch (error) {
    (error); // Custom error handling
    throw new Error('Failed to fetch recipe');
  }
};

// Recipes API
export const fetchRecipes = async () => {
  try {
    const response = await api.get('/recipes');
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const createRecipe = async (recipeData: any) => {
  try {
    const response = await axios.post('http://localhost:5000/api/recipes', recipeData);
    return response.data;
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw new Error('Failed to create recipe');
  }
};




// Favorites API
export const fetchFavorites = async () => {
  try {
    const response = await api.get('/favorites'); // Adjust URL if necessary
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const addFavorite = async (favoriteData: { userId: number; recipeId: number }) => {
  try {
    const response = await api.post('/favorites', favoriteData);
    return response.data;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

// Export the Axios instance as default
export default api;