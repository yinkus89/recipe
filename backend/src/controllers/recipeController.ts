import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await prisma.recipe.findMany({ include: { tags: true } });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipes" });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  const { title, description, instructions, category, tags, ingredients, userId } = req.body;
  try {
    const recipe = await prisma.recipe.create({
      data: {
        title,
        description,
        instructions,
        category,
        userId,
        tags: { connect: tags.map((id: number) => ({ id })) },
        ingredients: { create: ingredients },
      },
    });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ error: "Error creating recipe" });
  }
};
