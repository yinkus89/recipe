"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipeController_1 = require("../controllers/recipeController");
const express_validator_1 = require("express-validator");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const router = express_1.default.Router();
// Rate limiter middleware
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later",
});
// Apply rate limiter to all routes
router.use(limiter);
// Helper function for handling validation errors
const handleValidationErrors = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return true; // Indicating validation failed
    }
    return false; // No validation errors
};
// Routes
// Create recipe
router.post("/", [
    (0, express_validator_1.body)("name").isString().notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("ingredients")
        .isArray()
        .notEmpty()
        .withMessage("Ingredients must be a non-empty array"),
    (0, express_validator_1.body)("instructions")
        .isString()
        .notEmpty()
        .withMessage("Instructions are required"),
], async (req, res) => {
    if (handleValidationErrors(req))
        return; // Early exit if validation fails
    try {
        const newRecipe = await (0, recipeController_1.createRecipe)(req, res); // Controller should not send the response
        res.status(201).json(newRecipe); // Send the response here in the route
    }
    catch (err) {
        console.error("Failed to create recipe:", err);
        res.status(500).json({ message: "Failed to create recipe", error: err });
    }
});
// Get all recipes with pagination
router.get("/", async (req, res) => {
    try {
        req.query = { page: "1", limit: "10" }; // Default page and limit values
        const recipes = await (0, recipeController_1.getRecipes)(req); // Controller should not send the response
        if (!recipes) {
            return res.status(404).json({ message: "No recipes found" }); // Early return if no recipes
        }
        res.status(200).json(recipes); // Send the response once
    }
    catch (err) {
        console.error("Failed to get recipes:", err);
        res.status(500).json({ message: "Failed to get recipes", error: err });
    }
});
// Get recipe by ID
router.get("/:id", async (req, res) => {
    try {
        const recipe = await (0, recipeController_1.getRecipeById)(req); // Controller should not send the response
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" }); // Early return if not found
        }
        res.status(200).json(recipe); // Send the response once
    }
    catch (err) {
        console.error("Failed to get recipe:", err);
        res.status(500).json({ message: "Failed to get recipe", error: err });
    }
});
// Update recipe by ID
router.put("/:id", [
    (0, express_validator_1.body)("name").optional().isString().withMessage("Name must be a string"),
    (0, express_validator_1.body)("ingredients")
        .optional()
        .isArray()
        .withMessage("Ingredients must be an array"),
    (0, express_validator_1.body)("instructions")
        .optional()
        .isString()
        .withMessage("Instructions must be a string"),
], async (req, res) => {
    if (handleValidationErrors(req))
        return; // Early exit if validation fails
    try {
        const updatedRecipe = await (0, recipeController_1.updateRecipe)(req, res); // Controller should not send the response
        res.status(200).json(updatedRecipe); // Send the response here in the route
    }
    catch (err) {
        console.error("Failed to update recipe:", err);
        res.status(500).json({ message: "Failed to update recipe", error: err });
    }
});
// Delete recipe by ID
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await (0, recipeController_1.deleteRecipe)(req); // Controller should not send the response
        res.status(200).json({ message: "Recipe deleted successfully" }); // Send the response here in the route
    }
    catch (err) {
        console.error("Failed to delete recipe:", err);
        res.status(500).json({ message: "Failed to delete recipe", error: err });
    }
});
exports.default = router;
//# sourceMappingURL=recipeRoutes.js.map