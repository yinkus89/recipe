"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json()); // Parse JSON body
// Example: Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        // Type error explicitly to Error type
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});
// Example: Get all recipes
app.get('/recipes', async (req, res) => {
    try {
        const recipes = await prisma.recipe.findMany({
            include: {
                user: true, // Include related user
                ingredients: true, // Include ingredients
                comments: true, // Include comments
                tags: true, // Include tags
            },
        });
        res.json(recipes);
    }
    catch (error) {
        // Type error explicitly to Error type
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});
// Example: Create a new user
app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: { name, email, password },
        });
        res.json(newUser);
    }
    catch (error) {
        // Type error explicitly to Error type
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});
// Example: Create a new recipe
app.post('/recipes', async (req, res) => {
    const { title, description, instructions, category, imageURL, userId } = req.body;
    try {
        const newRecipe = await prisma.recipe.create({
            data: {
                title, description, instructions, category, imageURL, userId
            },
        });
        res.json(newRecipe);
    }
    catch (error) {
        // Type error explicitly to Error type
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});
// Example: Update a recipe
app.put('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, instructions, category, imageURL } = req.body;
    try {
        const updatedRecipe = await prisma.recipe.update({
            where: { id: parseInt(id) },
            data: { title, description, instructions, category, imageURL },
        });
        res.json(updatedRecipe);
    }
    catch (error) {
        // Type error explicitly to Error type
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});
// Example: Delete a recipe
app.delete('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.recipe.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    }
    catch (error) {
        // Type error explicitly to Error type
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});
// Start the server
const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
