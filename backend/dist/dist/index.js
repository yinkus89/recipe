"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors")); // Import CORS middleware
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Enable CORS for all origins (you can configure specific origins if needed)
app.use((0, cors_1.default)());
// Parse JSON body
app.use(express_1.default.json());
// Utility function to handle errors
const handleError = (res, error) => {
    if (error instanceof Error) {
        res.status(500).json({ error: error.message });
    }
    else {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};
// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        handleError(res, error);
    }
});
// Get all recipes with related data
app.get('/recipes', async (req, res) => {
    try {
        const recipes = await prisma.recipe.findMany({
            include: {
                user: true,
                ingredients: true,
                comments: true,
                tags: true,
            },
        });
        res.json(recipes);
    }
    catch (error) {
        handleError(res, error);
    }
});
// Create a new user
app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: { name, email, password },
        });
        res.json(newUser);
    }
    catch (error) {
        handleError(res, error);
    }
});
// Create a new recipe
app.post('/recipes', async (req, res) => {
    const { title, description, instructions, category, imageURL, userId } = req.body;
    try {
        const newRecipe = await prisma.recipe.create({
            data: { title, description, instructions, category, imageURL, userId },
        });
        res.json(newRecipe);
    }
    catch (error) {
        handleError(res, error);
    }
});
// Update a recipe
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
        handleError(res, error);
    }
});
// Delete a recipe
app.delete('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.recipe.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    }
    catch (error) {
        handleError(res, error);
    }
});
// Register route
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || name.length < 3) {
        return res.status(400).json({ message: "Name must be at least 3 characters long" });
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    if (!password || password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            message: "Login successful",
            user: { id: user.id, name: user.name, email: user.email },
            token, // Send token in response
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
// Start the server
const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
