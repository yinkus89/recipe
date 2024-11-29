import { body } from 'express-validator';

// Validation for creating a recipe
export const createRecipeValidator = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('ingredients').isArray().notEmpty().withMessage('Ingredients must be a non-empty array'),
  body('instructions').isString().notEmpty().withMessage('Instructions are required'),
];

// Validation for updating a recipe
export const updateRecipeValidator = [
  body('name').optional().isString().withMessage('Name must be a string'),
  body('ingredients').optional().isArray().withMessage('Ingredients must be an array'),
  body('instructions').optional().isString().withMessage('Instructions must be a string'),
];
