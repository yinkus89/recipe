import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Adjust import path for your User model
import { PrismaClient } from "@prisma/client";
import { body } from "express-validator";

const prisma = new PrismaClient();

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

    // Create a JWT token (include user data in the payload)
    const token = jwt.sign(
      { id: user.id, username: user.name }, // Payload with user id and username
      process.env.JWT_SECRET_KEY || "default-secret-key", // Secret key from env or default
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

// Login route
router.post(
  "/login",
  [
    body("username").isString().notEmpty().withMessage("Username is required"),
    body("password").isString().notEmpty().withMessage("Password is required"),
  ],
  async (req: Request, res: Response) => {
    await loginUser(req, res); // Call the login controller
  }
);
export default router;
