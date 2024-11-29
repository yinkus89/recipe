// Create recipe
import express, { Request, Response, NextFunction } from "express";
import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";

// Define types for Recipe and request body
interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  // Add other fields as per your recipe schema
}

interface CreateRecipeRequest extends Request {
  body: {
    name: string;
    ingredients: string[];
    instructions: string;
    // Include any other required fields for creating a recipe
  };
}

interface UpdateRecipeRequest extends Request {
  body: {
    name?: string;
    ingredients?: string[];
    instructions?: string;
    // Fields that can be updated
  };
}

const router = express.Router();

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

// Apply rate limiter to all routes
router.use(limiter);

// Helper function for handling validation errors
const handleValidationErrors = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

// Routes

// Create recipe
router.post(
  "/",
  [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("ingredients")
      .isArray()
      .notEmpty()
      .withMessage("Ingredients must be a non-empty array"),
    body("instructions")
      .isString()
      .notEmpty()
      .withMessage("Instructions are required"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return;

    try {
      const newRecipe = await createRecipe(req, res);
      res.status(201).json(newRecipe);
    } catch (err) {
      console.error("Failed to create recipe:", err);
      res.status(500).json({ message: "Failed to create recipe", error: err });
    }
  }
);

// Get all recipes with pagination
router.get("/", async (req: Request, res: Response) => {
  try {
    req.query = { page: "1", limit: "10" }; // Default page and limit values
    const recipes = await getRecipes(req, res);
    res.status(200).json(recipes);
  } catch (err) {
    console.error("Failed to get recipes:", err);
    res.status(500).json({ message: "Failed to get recipes", error: err });
  }
});

// Get recipe by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const recipe = await getRecipeById(req, res);

    res.status(200).json(recipe);
  } catch (err) {
    console.error("Failed to get recipe:", err);
    res.status(500).json({ message: "Failed to get recipe", error: err });
  }
});

// Update recipe by ID
router.put(
  "/:id",
  [
    body("name").optional().isString().withMessage("Name must be a string"),
    body("ingredients")
      .optional()
      .isArray()
      .withMessage("Ingredients must be an array"),
    body("instructions")
      .optional()
      .isString()
      .withMessage("Instructions must be a string"),
  ],
  async (req: UpdateRecipeRequest, res: Response) => {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return;

    try {
      const updatedRecipe = await updateRecipe(req, res);

      res.status(200).json(updatedRecipe);
    } catch (err) {
      console.error("Failed to update recipe:", err);
      res.status(500).json({ message: "Failed to update recipe", error: err });
    }
  }
);

// Delete recipe by ID
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await deleteRecipe(req, res);

      res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (err) {
      console.error("Failed to delete recipe:", err);
      res.status(500).json({ message: "Failed to delete recipe", error: err });
    }
  }
);

export default router;
