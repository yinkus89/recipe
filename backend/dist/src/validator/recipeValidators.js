"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIngredientsNotEmpty = exports.updateRecipeValidator = exports.createRecipeValidator = void 0;
const express_validator_1 = require("express-validator");
// Helper function to validate string fields
const stringFieldValidator = (field) => (0, express_validator_1.body)(field).isString().notEmpty().withMessage(`${field} is required and must be a string`);
// Helper function to validate array fields
const arrayFieldValidator = (field) => (0, express_validator_1.body)(field).optional().isArray().withMessage(`${field} must be an array if provided`);
// Validator for creating a new recipe
exports.createRecipeValidator = [
    stringFieldValidator('title'),
    stringFieldValidator('description'),
    stringFieldValidator('instructions'),
    stringFieldValidator('category'),
    arrayFieldValidator('ingredients'),
    (0, express_validator_1.body)('ingredients.*.name').isString().notEmpty().withMessage('Ingredient name is required'),
    (0, express_validator_1.body)('ingredients.*.quantity').isNumeric().withMessage('Ingredient quantity must be a number'),
    (0, express_validator_1.body)('ingredients.*.unit').isString().notEmpty().withMessage('Ingredient unit is required'),
    (0, express_validator_1.body)('tags').optional().isArray().withMessage('Tags must be an array'),
    (0, express_validator_1.body)('imageURL').optional().isURL().withMessage('Image URL must be valid'),
    (0, express_validator_1.body)('userId').isInt().withMessage('User ID must be a valid integer'),
];
// Validator for updating a recipe
exports.updateRecipeValidator = [
    (0, express_validator_1.body)('title').optional().isString().trim().withMessage('Title must be a string'),
    (0, express_validator_1.body)('description').optional().isString().trim().withMessage('Description must be a string'),
    (0, express_validator_1.body)('instructions').optional().isString().trim().withMessage('Instructions must be a string'),
    (0, express_validator_1.body)('category').optional().isString().trim().withMessage('Category must be a string'),
    (0, express_validator_1.body)('ingredients').optional().isArray().withMessage('Ingredients must be an array'),
    (0, express_validator_1.body)('ingredients.*.name').optional().isString().notEmpty().withMessage('Ingredient name must be a string'),
    (0, express_validator_1.body)('ingredients.*.quantity').optional().isNumeric().withMessage('Ingredient quantity must be a number'),
    (0, express_validator_1.body)('ingredients.*.unit').optional().isString().notEmpty().withMessage('Ingredient unit must be a string'),
    (0, express_validator_1.body)('tags').optional().isArray().withMessage('Tags must be an array'),
    (0, express_validator_1.body)('imageURL').optional().isURL().withMessage('Image URL must be valid'),
    (0, express_validator_1.body)('userId').optional().isInt().withMessage('User ID must be a valid integer'),
];
// Custom validation for ingredients to ensure the array is not empty if provided
const validateIngredientsNotEmpty = (req, res, next) => {
    const { ingredients } = req.body;
    // If ingredients are provided and the array is empty, return an error
    if (ingredients && Array.isArray(ingredients) && ingredients.length === 0) {
        res.status(400).json({ message: 'Ingredients cannot be an empty array' });
    }
    next();
};
exports.validateIngredientsNotEmpty = validateIngredientsNotEmpty;
//# sourceMappingURL=recipeValidators.js.map