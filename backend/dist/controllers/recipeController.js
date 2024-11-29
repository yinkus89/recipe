"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipe = exports.updateRecipe = exports.getRecipeById = exports.getRecipes = exports.createRecipe = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create Recipe
const createRecipe = async (req, res) => {
    const { title, description, instructions, category, imageURL, userId } = req.body;
    if (!title || !description || !instructions || !category || !userId) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    try {
        const newRecipe = await prisma.recipe.create({
            data: {
                title,
                description,
                instructions,
                category,
                imageURL,
                userId,
            },
        });
        res.status(201).json(newRecipe);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating recipe", details: error });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.createRecipe = createRecipe;
// Get All Recipes
const getRecipes = async (req, res) => {
    try {
        const recipes = await prisma.recipe.findMany();
        res.status(200).json(recipes);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching recipes", details: error });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.getRecipes = getRecipes;
// Get Recipe by ID
const getRecipeById = async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid recipe ID" });
        return;
    }
    try {
        const recipe = await prisma.recipe.findUnique({
            where: { id },
        });
        if (!recipe) {
            res.status(404).json({ error: "Recipe not found" });
            return;
        }
        res.status(200).json(recipe);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching recipe", details: error });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.getRecipeById = getRecipeById;
// Update Recipe
const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, instructions } = req.body;
    if (!name || !ingredients || !instructions) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const updatedRecipe = await prisma.recipe.update({
            where: { id: parseInt(id) },
            data: {
                title: name,
                ingredients,
                instructions,
            },
        });
        return res.status(200).json(updatedRecipe);
    }
    catch (error) {
        console.error("Error updating recipe:", error);
        return res.status(500).json({ message: "Error updating recipe" });
    }
};
exports.updateRecipe = updateRecipe;
// Delete Recipe
const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.recipe.delete({
            where: { id: parseInt(id) },
        });
        return res.status(204).json({ message: "Recipe deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting recipe:", error);
        return res.status(500).json({ message: "Error deleting recipe" });
    }
};
exports.deleteRecipe = deleteRecipe;
//# sourceMappingURL=recipeController.js.map