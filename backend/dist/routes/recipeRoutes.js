"use strict";
// src/routes/recipeRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../middleware/authenticate"); // Correct path for middleware import
const recipeController_1 = require("../controllers/recipeController");
const router = express_1.default.Router();
// Protected Route - Ensure authentication before proceeding
router.post('/', authenticate_1.authenticate, recipeController_1.createRecipe);
router.get('/', authenticate_1.authenticate, recipeController_1.getRecipes);
exports.default = router;
