"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecipe = exports.getRecipes = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const getRecipes = async (req, res) => {
    try {
        const recipes = await client_1.default.recipe.findMany({ include: { tags: true } });
        res.json(recipes);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching recipes" });
    }
};
exports.getRecipes = getRecipes;
const createRecipe = async (req, res) => {
    const { title, description, instructions, category, tags, ingredients, userId } = req.body;
    try {
        const recipe = await client_1.default.recipe.create({
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
        res.status(201).json(recipe);
    }
    catch (error) {
        res.status(400).json({ error: "Error creating recipe" });
    }
};
exports.createRecipe = createRecipe;
