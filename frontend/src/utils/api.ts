import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define types for recipe data
export interface RecipeData {
  title: string;
  description: string;
  instructions: string;
  category: string;
  imageURL: string | null;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  instructions: string;
  category: string;
  imageURL: string | null;
  userId: number;
}

// Axios interceptor to attach token to headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await api.get('/users'); // Update '/users' if your endpoint is different
    return response.data;
  } catch (error: any) {
    console.error('Error fetching users:', error);
    throw new Error(error?.response?.data?.message || 'Failed to fetch users.');
  }
};

// Register User
export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/register', { name, email, password });
    return response.data; // { message, user }
  } catch (error: any) {
    console.error('Error during registration:', error);
    throw new Error(error?.response?.data?.message || 'Registration failed');
  }
};

// Login User
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    const { token } = response.data; // { message, token }
    localStorage.setItem('token', token); // Save token for authenticated requests
    return token;
  } catch (error: any) {
    console.error('Error during login:', error);
    throw new Error(error?.response?.data?.message || 'Login failed');
  }
};

// Get User Profile
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');

    const response = await api.get('/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data; // { user }
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    throw new Error(error?.response?.data?.message || 'Failed to fetch user profile');
  }
};

// Fetch all recipes
export const getRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await api.get<Recipe[]>('/recipes');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching recipes:', error);
    throw new Error(error?.response?.data?.message || 'Error fetching recipes.');
  }
};

// Fetch recipe by ID
export const getRecipeById = async (id: number): Promise<Recipe> => {
  try {
    const response = await api.get<Recipe>(`/recipes/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching recipe by ID:', error);
    throw new Error(error?.response?.data?.message || 'Error fetching recipe by ID.');
  }
};

// Create a new recipe
export const createRecipe = async (recipeData: RecipeData): Promise<Recipe> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');

    const response = await api.post('/recipes', recipeData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data; // Recipe data
  } catch (error: any) {
    console.error('Error creating recipe:', error);
    throw new Error(error?.response?.data?.message || 'Failed to create recipe');
  }
};

// Update a recipe
export const updateRecipe = async (recipeId: number, recipeData: RecipeData): Promise<Recipe> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');

    const response = await api.put(`/recipes/${recipeId}`, recipeData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data; // Updated recipe data
  } catch (error: any) {
    console.error('Error updating recipe:', error);
    throw new Error(error?.response?.data?.message || 'Failed to update recipe');
  }
};

// Delete a recipe
export const deleteRecipe = async (id: number): Promise<void> => {
  try {
    await api.delete(`/recipes/${id}`);
  } catch (error: any) {
    console.error('Error deleting recipe:', error);
    throw new Error(error?.response?.data?.message || 'Error deleting recipe.');
  }
};

export default api;
