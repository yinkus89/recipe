import { Router } from "express";
import { authenticateUser } from "../middlewares/authenticateUser";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favoriteController";
import { param } from "express-validator"; // Import validation middleware for route parameters

const router = Router();

// Route to get all favorites
router.get("/", authenticateUser, getFavorites);

// Route to add a favorite (POST to /favorites)
router.post("/", authenticateUser, addFavorite);

// Route to remove a favorite (DELETE to /favorites/:recipeId)
router.delete(
  "/:recipeId", // Change the route to be RESTful
  authenticateUser,
  param("recipeId").isInt().withMessage("Invalid recipe ID"), // Validate that recipeId is an integer
  removeFavorite
);

export default router;
