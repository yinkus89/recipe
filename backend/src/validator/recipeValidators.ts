import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Helper function to validate string fields
const stringFieldValidator = (field: string) => 
  body(field).isString().notEmpty().withMessage(`${field} is required and must be a string`);

// Helper function to validate array fields
const arrayFieldValidator = (field: string) => 
  body(field).optional().isArray().withMessage(`${field} must be an array if provided`);

// Validator for creating a new recipe
export const createRecipeValidator = [
  stringFieldValidator('title'),
  stringFieldValidator('description'),
  stringFieldValidator('instructions'),
  stringFieldValidator('category'),
  arrayFieldValidator('ingredients'),
  body('ingredients.*.name').isString().notEmpty().withMessage('Ingredient name is required'),
  body('ingredients.*.quantity').isNumeric().withMessage('Ingredient quantity must be a number'),
  body('ingredients.*.unit').isString().notEmpty().withMessage('Ingredient unit is required'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('imageURL').optional().isURL().withMessage('Image URL must be valid'),
  body('userId').isInt().withMessage('User ID must be a valid integer'),
];

// Validator for updating a recipe
export const updateRecipeValidator = [
  body('title').optional().isString().trim().withMessage('Title must be a string'),
  body('description').optional().isString().trim().withMessage('Description must be a string'),
  body('instructions').optional().isString().trim().withMessage('Instructions must be a string'),
  body('category').optional().isString().trim().withMessage('Category must be a string'),
  body('ingredients').optional().isArray().withMessage('Ingredients must be an array'),
  body('ingredients.*.name').optional().isString().notEmpty().withMessage('Ingredient name must be a string'),
  body('ingredients.*.quantity').optional().isNumeric().withMessage('Ingredient quantity must be a number'),
  body('ingredients.*.unit').optional().isString().notEmpty().withMessage('Ingredient unit must be a string'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('imageURL').optional().isURL().withMessage('Image URL must be valid'),
  body('userId').optional().isInt().withMessage('User ID must be a valid integer'),
];

// Custom validation for ingredients to ensure the array is not empty if provided
export const validateIngredientsNotEmpty = (req: Request, res: Response, next: NextFunction): void => {
  const { ingredients } = req.body;
  
  // If ingredients are provided and the array is empty, return an error
  if (ingredients && Array.isArray(ingredients) && ingredients.length === 0) {
    res.status(400).json({ message: 'Ingredients cannot be an empty array' });
  }
  
  next();
};



