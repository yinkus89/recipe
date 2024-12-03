// Define the structure of the user data (payload) based on the User model
export interface UserPayload {
  id: number;                // Unique identifier of the user
  name: string;              // User's name
  email: string;             // User's email (unique)
  createdAt: Date;           // Date when the user was created
  recipes: Recipe[];         // List of recipes created by the user
  favorites: Recipe[];       // List of recipes favorited by the user
  comments: Comment[];       // List of comments made by the user
}

// Define the structure of a recipe as it appears in the user's payload
export interface Recipe {
  id: number;                // Unique identifier of the recipe
  title: string;             // Title of the recipe
  description: string;       // Description of the recipe
  instructions: string;      // Instructions for the recipe
  imageURL?: string;         // Optional URL for an image of the recipe
  category: string;          // Category of the recipe (e.g., 'dessert', 'main course')
  createdAt: Date;           // Date when the recipe was created
  userId: number;            // ID of the user who created the recipe
  comments: Comment[];       // List of comments on this recipe
  ingredients: Ingredient[]; // List of ingredients for the recipe
  tags: Tag[];               // Tags associated with the recipe
}

// Define the structure of a comment on a recipe
export interface Comment {
  id: number;                // Unique identifier of the comment
  text: string;              // The text of the comment
  createdAt: Date;           // Date when the comment was created
  userId: number;            // ID of the user who made the comment
  recipeId: number;          // ID of the recipe the comment is for
}

// Define the structure of an ingredient in a recipe
export interface Ingredient {
  id: number;                // Unique identifier of the ingredient
  name: string;              // Name of the ingredient (e.g., 'sugar', 'flour')
  quantity: number;          // Quantity of the ingredient
  unit: string;              // Unit of measurement (e.g., 'cups', 'grams')
  recipeId: number;          // ID of the recipe that this ingredient belongs to
}

// Define the structure of a tag associated with a recipe
export interface Tag {
  id: number;                // Unique identifier of the tag
  name: string;              // Name of the tag (e.g., 'vegan', 'gluten-free')
  recipes: Recipe[];         // List of recipes associated with this tag
}
