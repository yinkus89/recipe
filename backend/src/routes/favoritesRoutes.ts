// src/routes/favoriteRoutes.ts
import { Router } from "express";
import { authenticateUser } from "../middlewares/authenticateUser";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favoriteController";

const router = Router();

// Route to get all favorites
router.get("/", authenticateUser, getFavorites);

// Route to add a favorite
router.post("/add", authenticateUser, addFavorite);

// Route to remove a favorite
router.delete("/remove/:recipeId", authenticateUser, removeFavorite);

export default router;
