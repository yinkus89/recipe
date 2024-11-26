const prisma = require('@prisma/client');
const { PrismaClient } = prisma;

const db = new PrismaClient();

module.exports = {
  /**
   * Fetch all users
   */
  getAllUsers: async () => {
    return await db.user.findMany();
  },

  /**
   * Fetch a user by ID
   */
  getUserById: async (userId) => {
    return await db.user.findUnique({
      where: { id: userId },
    });
  },

  /**
   * Create a new user
   */
  createUser: async (data) => {
    const { name, email, password, profilePicture } = data;
    return await db.user.create({
      data: { name, email, password, profilePicture },
    });
  },

  /**
   * Fetch all recipes
   */
  getAllRecipes: async () => {
    return await db.recipe.findMany({
      include: {
        tags: true,
        ingredients: true,
        comments: true,
      },
    });
  },

  /**
   * Fetch a recipe by ID
   */
  getRecipeById: async (recipeId) => {
    return await db.recipe.findUnique({
      where: { id: recipeId },
      include: {
        tags: true,
        ingredients: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
  },

  /**
   * Create a new recipe
   */
  createRecipe: async (data) => {
    const { title, description, instructions, category, tags, ingredients, userId } = data;
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
  },

  /**
   * Fetch all tags
   */
  getAllTags: async () => {
    return await db.tag.findMany();
  },

  /**
   * Create a new comment for a recipe
   */
  createComment: async (data) => {
    const { text, recipeId, userId } = data;
    return await db.comment.create({
      data: {
        text,
        recipeId,
        userId,
      },
    });
  },

  /**
   * Fetch all comments for a recipe
   */
  getCommentsForRecipe: async (recipeId) => {
    return await db.comment.findMany({
      where: { recipeId },
      include: {
        user: true,
      },
    });
  },
};
