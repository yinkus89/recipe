"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecipeValidator = exports.createRecipeValidator = void 0;
const express_validator_1 = require("express-validator");
// Validation for creating a recipe
exports.createRecipeValidator = [
    (0, express_validator_1.body)('name').isString().notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('ingredients').isArray().notEmpty().withMessage('Ingredients must be a non-empty array'),
    (0, express_validator_1.body)('instructions').isString().notEmpty().withMessage('Instructions are required'),
];
// Validation for updating a recipe
exports.updateRecipeValidator = [
    (0, express_validator_1.body)('name').optional().isString().withMessage('Name must be a string'),
    (0, express_validator_1.body)('ingredients').optional().isArray().withMessage('Ingredients must be an array'),
    (0, express_validator_1.body)('instructions').optional().isString().withMessage('Instructions must be a string'),
];
//# sourceMappingURL=recipeValidators.js.map