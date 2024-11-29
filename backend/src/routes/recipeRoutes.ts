import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Controller for login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await prisma.user.findFirst({ where: { name: username } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return; // Stop execution
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return; // Stop execution
    }

    // Create a JWT token with user data
    const token = jwt.sign(
      { id: user.id, username: user.name },
      process.env.JWT_SECRET_KEY || "default-secret-key",
      { expiresIn: "1h" }
    );

    // Send token in the response
    res.json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    next(err); // Pass to error handler middleware
  }
};

// Controller for getting recipes
const getRecipes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Sample logic: Fetching all recipes from database
    const recipes = await prisma.recipe.findMany();
    res.json(recipes); // Sending response here
  } catch (err) {
    next(err); // Pass error to the next middleware
  }
};

// Create an express router instance
const router = express.Router();

// Validation middleware for login
router.post(
  "/login",
  [
    body("username").isString().notEmpty().withMessage("Username is required"),
    body("password").isString().notEmpty().withMessage("Password is required"),
  ],
  loginUser // Directly use the loginUser controller function
);

// Route for fetching recipes
router.get("/recipes", getRecipes);

export default router;
