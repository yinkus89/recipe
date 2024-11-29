import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Interfaces for type safety
interface RecipeCreateInput {
  title: string;
  description: string;
  instructions: string;
  category: string;
  imageURL?: string;
  userId: number;
}

interface RecipeUpdateInput {
  title?: string;
  description?: string;
  instructions?: string;
  category?: string;
  imageURL?: string;
}

// Create Recipe
export const createRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, instructions, category, imageURL, userId } =
    req.body as RecipeCreateInput;

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
  } catch (error) {
    res.status(500).json({ error: "Error creating recipe", details: error });
  } finally {
    await prisma.$disconnect();
  }
};

// Get All Recipes
export const getRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recipes = await prisma.recipe.findMany();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipes", details: error });
  } finally {
    await prisma.$disconnect();
  }
};

// Get Recipe by ID
export const getRecipeById = async (
  req: Request,
  res: Response
): Promise<void> => {
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
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipe", details: error });
  } finally {
    await prisma.$disconnect();
  }
};

// Update Recipe
export const updateRecipe = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error("Error updating recipe:", error);
    return res.status(500).json({ message: "Error updating recipe" });
  }
};

// Delete Recipe
export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.recipe.delete({
      where: { id: parseInt(id) },
    });

    return res.status(204).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return res.status(500).json({ message: "Error deleting recipe" });
  }
};
