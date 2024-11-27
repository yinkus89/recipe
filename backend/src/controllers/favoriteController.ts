// backend/src/controllers/favoriteController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controller function to fetch favorite recipes
export const getFavorites = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Error fetching favorites' });
  }
};
