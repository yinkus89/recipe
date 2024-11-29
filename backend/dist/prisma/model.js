"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db = new client_1.PrismaClient();
exports.model = {
    /**
     * Fetch all users with selected fields for optimization.
     */
    getAllUsers: async () => {
        try {
            return await db.user.findMany({
                select: { id: true, name: true, email: true },
            });
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Failed to fetch users');
        }
    },
    /**
     * Fetch a user by ID.
     */
    getUserById: async (userId) => {
        try {
            return await db.user.findUnique({
                where: { id: userId },
            });
        }
        catch (error) {
            console.error(`Error fetching user with ID ${userId}:`, error);
            throw new Error('Failed to fetch user');
        }
    },
    /**
     * Create a new user with hashed password.
     */
    createUser: async (data) => {
        const { name, email, password, profilePicture } = data;
        try {
            // Hash the password for security
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            return await db.user.create({
                data: { name, email, password: hashedPassword, },
            });
        }
        catch (error) {
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
    getAllRecipes: async () => {
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
        }
        catch (error) {
            console.error('Error fetching recipes:', error);
            throw new Error('Failed to fetch recipes');
        }
    },
    /**
     * Fetch a recipe by ID with associated data.
     */
    getRecipeById: async (recipeId) => {
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
        }
        catch (error) {
            console.error(`Error fetching recipe with ID ${recipeId}:`, error);
            throw new Error('Failed to fetch recipe');
        }
    },
    /**
     * Create a new recipe, connecting tags and creating ingredients.
     */
    createRecipe: async (data) => {
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
        }
        catch (error) {
            console.error('Error creating recipe:', error);
            throw new Error('Failed to create recipe');
        }
    },
    /**
     * Fetch all tags.
     */
    getAllTags: async () => {
        try {
            return await db.tag.findMany();
        }
        catch (error) {
            console.error('Error fetching tags:', error);
            throw new Error('Failed to fetch tags');
        }
    },
    /**
     * Create a new comment for a recipe.
     */
    createComment: async (data) => {
        const { text, recipeId, userId } = data;
        try {
            return await db.comment.create({
                data: {
                    text,
                    recipeId,
                    userId,
                },
            });
        }
        catch (error) {
            console.error('Error creating comment:', error);
            throw new Error('Failed to create comment');
        }
    },
    /**
     * Fetch all comments for a recipe with user details.
     */
    getCommentsForRecipe: async (recipeId) => {
        try {
            return await db.comment.findMany({
                where: { recipeId },
                include: { user: { select: { id: true, name: true } } },
            });
        }
        catch (error) {
            console.error(`Error fetching comments for recipe with ID ${recipeId}:`, error);
            throw new Error('Failed to fetch comments');
        }
    },
    /**
     * Create a new tag.
     */
    createTag: async (data) => {
        const { name } = data;
        try {
            return await db.tag.create({
                data: { name },
            });
        }
        catch (error) {
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
exports.default = exports.model;
//# sourceMappingURL=model.js.map