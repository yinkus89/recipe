// src/routes/recipeRoutes.ts

import express from 'express';
import { authenticate } from '../middleware/authenticate';  // Correct path for middleware import
import { createRecipe, getRecipes } from '../controllers/recipeController';

const router = express.Router();

// Protected Route - Ensure authentication before proceeding
router.post('/', authenticate, createRecipe);
router.get('/', authenticate, getRecipes);

export default router;
