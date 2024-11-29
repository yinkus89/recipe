"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavorite = exports.addFavorite = exports.getFavorites = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Controller to fetch the user's favorites
const getFavorites = async (req, res) => {
    const { userId } = req.body;
    try {
        const favorites = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                favorites: true, // Include favorite recipes in the response
            },
        });
        favorites && res.json(favorites.favorites); // Send the list of favorites
    }
    catch (error) {
        console.error("Failed to get favorites:", error);
        res.status(500).json({ message: "Server error while fetching favorites." });
    }
};
exports.getFavorites = getFavorites;
// Controller to add a favorite
const addFavorite = async (req, res) => {
    const { userId, recipeId } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                favorites: {
                    where: { id: recipeId }, // Check if the recipe is already in favorites
                },
            },
        });
        if (user && user?.favorites.length > 0) {
            res.status(409).json({ message: "Favorite already added." });
        }
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                favorites: {
                    connect: { id: recipeId }, // Connect the recipe to the user's favorites
                },
            },
        });
        res.status(201).json(updatedUser); // Return updated user data
    }
    catch (error) {
        console.error("Failed to add favorite:", error);
        res.status(500).json({ message: "Failed to add favorite." });
    }
};
exports.addFavorite = addFavorite;
// Controller to remove a favorite
const removeFavorite = async (req, res) => {
    const userId = req.user?.id;
    const { recipeId } = req.params;
    if (!userId) {
        res.status(400).json({ message: "User not authenticated." });
    }
    if (!recipeId) {
        res.status(400).json({ message: "Recipe ID is required." });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                favorites: {
                    where: { id: Number(recipeId) }, // Check if the recipe is in favorites
                },
            },
        });
        if (!user?.favorites.length) {
            res.status(404).json({ message: "Favorite not found." });
        }
        await prisma.user.update({
            where: { id: userId },
            data: {
                favorites: {
                    disconnect: { id: Number(recipeId) }, // Remove the recipe from favorites
                },
            },
        });
        res.status(200).json({ message: "Favorite removed successfully." });
    }
    catch (error) {
        console.error("Failed to remove favorite:", error);
        res.status(500).json({ message: "Failed to remove favorite." });
    }
};
exports.removeFavorite = removeFavorite;
//# sourceMappingURL=favoriteController.js.map