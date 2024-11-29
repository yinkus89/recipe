import { PrismaClient, User, Recipe, Comment, Tag, Ingredient } from '@prisma/client';
import bcrypt from 'bcrypt';

const db = new PrismaClient();

// Define the types for input data
interface CreateUserData {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
}

interface CreateRecipeData {
  title: string;
  description: string;
  instructions: string;
  category: string;
  tags: number[]; // Array of tag IDs
  ingredients: Omit<Ingredient, 'id'>[]; // Ingredients without IDs for creation
  userId: number;
}

interface CreateCommentData {
  text: string;
  recipeId: number;
  userId: number;
}

interface CreateTagData {
  name: string;
}

export const model = {
  /**
   * Fetch all users with selected fields for optimization.
   */
  getAllUsers: async (): Promise<Pick<User, 'id' | 'name' | 'email'>[]> => {
    try {
      return await db.user.findMany({
        select: { id: true, name: true, email: true },
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  },

  /**
   * Fetch a user by ID.
   */
  getUserById: async (userId: number): Promise<User | null> => {
    try {
      return await db.user.findUnique({
        where: { id: userId },
      });
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw new Error('Failed to fetch user');
    }
  },

  /**
   * Create a new user with hashed password.
   */
  createUser: async (data: CreateUserData): Promise<User> => {
    const { name, email, password, profilePicture } = data;

    try {
      // Hash the password for security
      const hashedPassword = await bcrypt.hash(password, 10);

      return await db.user.create({
        data: { name, email, password: hashedPassword,  },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new Error('Email already in use');
      }
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  },

  /**
   * Fetch all recipes with associated data.
   */
  getAllRecipes: async (): Promise<Recipe[]> => {
    try {
      return await db.recipe.findMany({
        include: {
          tags: true,
          ingredients: true,
          comments: {
            include: { user: { select: { id: true, name: true } } },
          },
        },
      });
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw new Error('Failed to fetch recipes');
    }
  },

  /**
   * Fetch a recipe by ID with associated data.
   */
  getRecipeById: async (recipeId: number): Promise<Recipe | null> => {
    try {
      return await db.recipe.findUnique({
        where: { id: recipeId },
        include: {
          tags: true,
          ingredients: true,
          comments: {
            include: { user: { select: { id: true, name: true } } },
          },
        },
      });
    } catch (error) {
      console.error(`Error fetching recipe with ID ${recipeId}:`, error);
      throw new Error('Failed to fetch recipe');
    }
  },

  /**
   * Create a new recipe, connecting tags and creating ingredients.
   */
  createRecipe: async (data: CreateRecipeData): Promise<Recipe> => {
    const { title, description, instructions, category, tags, ingredients, userId } = data;

    try {
      return await db.recipe.create({
        data: {
          title,
          description,
          instructions,
          category,
          userId,
          tags: { connect: tags.map((id) => ({ id })) },
          ingredients: { create: ingredients },
        },
      });
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw new Error('Failed to create recipe');
    }
  },

  /**
   * Fetch all tags.
   */
  getAllTags: async (): Promise<Tag[]> => {
    try {
      return await db.tag.findMany();
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw new Error('Failed to fetch tags');
    }
  },

  /**
   * Create a new comment for a recipe.
   */
  createComment: async (data: CreateCommentData): Promise<Comment> => {
    const { text, recipeId, userId } = data;

    try {
      return await db.comment.create({
        data: {
          text,
          recipeId,
          userId,
        },
      });
    } catch (error) {
      console.error('Error creating comment:', error);
      throw new Error('Failed to create comment');
    }
  },

  /**
   * Fetch all comments for a recipe with user details.
   */
  getCommentsForRecipe: async (recipeId: number): Promise<Comment[]> => {
    try {
      return await db.comment.findMany({
        where: { recipeId },
        include: { user: { select: { id: true, name: true } } },
      });
    } catch (error) {
      console.error(`Error fetching comments for recipe with ID ${recipeId}:`, error);
      throw new Error('Failed to fetch comments');
    }
  },

  /**
   * Create a new tag.
   */
  createTag: async (data: CreateTagData): Promise<Tag> => {
    const { name } = data;

    try {
      return await db.tag.create({
        data: { name },
      });
    } catch (error) {
      console.error('Error creating tag:', error);
      throw new Error('Failed to create tag');
    }
  },
};

// Gracefully handle Prisma client connection shutdown
process.on('SIGINT', async () => {
  await db.$disconnect();
  console.log('Prisma client disconnected');
  process.exit(0);
});

export default model;
