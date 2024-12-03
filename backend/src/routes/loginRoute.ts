import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { body, validationResult } from "express-validator";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Helper function to handle validation errors
const handleValidationErrors = (req: Request, res: Response): boolean => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return true; // Indicates that there were validation errors
  }
  return false;
};

// User login controller
export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await prisma.user.findFirst({ where: { name: username } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if JWT secret is defined
    const jwtSecret = process.env.JWT_SECRET_KEY;
    if (!jwtSecret) {
      console.error("JWT secret key is not defined");
      return res.status(500).json({ message: "Server error, JWT secret missing" });
    }

    // Create a JWT token (include user data in the payload)
    const token = jwt.sign(
      { id: user.id, username: user.name }, // Payload with user id and username
      jwtSecret, // Secret key from env or default
      { expiresIn: "1h" } // Token expiration time
    );

    // Send the token in the response
    return res.json({ token });
  } catch (err) {
    console.error("Error during login:", err); // Log error for debugging
    return res.status(500).json({ message: "Server error" });
  }
};

// Initialize router
const router = express.Router();

// Login route with validation and error handling
router.post(
  "/api/login",
  [
    body("username").isString().notEmpty().withMessage("Username is required"),
    body("password").isString().notEmpty().withMessage("Password is required"),
  ],
  (req: Request, res: Response) => {
    // Check for validation errors
    if (handleValidationErrors(req, res)) return;

    // Call the login controller
    loginUser(req, res);
  }
);

export default router;
