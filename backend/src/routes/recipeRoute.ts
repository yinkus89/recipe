import express from "express";
import { getRecipes, createRecipe } from "../controllers/recipeController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();
router.get("/", getRecipes);
router.post("/", authenticate, createRecipe);

export default router;
