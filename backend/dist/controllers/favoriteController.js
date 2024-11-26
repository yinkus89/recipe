"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavorites = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Controller function to fetch favorite recipes
const getFavorites = async (req, res) => {
    try {
        // Assuming a many-to-many relationship between User and Recipe
        const favorites = await prisma.user.findMany({
            where: {
            // If needed, add any filters (like a specific user)
            },
            select: {
                id: true,
                name: true,
                email: true,
                favorites: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        imageURL: true,
                    },
                },
            },
        });
        res.json(favorites); // Send the list of favorites as JSON
    }
    catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ message: 'Error fetching favorites' });
    }
};
exports.getFavorites = getFavorites;
