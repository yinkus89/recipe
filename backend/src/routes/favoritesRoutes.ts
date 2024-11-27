// backend/src/routes/favorites.ts
import { Router } from "express";
import { getFavorites } from "controllers/favoriteController";

const router = Router();

// Define route for fetching favorite recipes
router.get("/favorites", getFavorites);

export default router;
