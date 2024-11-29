import express, { Request, Response } from "express";
import { registerUser, loginUser } from "../controllers/authController";
import prisma from "../../prisma/client";

const router = express.Router();

// Register route
router.post("/registerUser", async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req, res); // Call registerUser with request body
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
});

// Login route
router.post("/login", async (req: Request, res: Response) => {
  try {
    const token = await loginUser(req, res); // Call loginUser with request body

    res.status(200).json({ message: "Login successful", token }); // Send JWT token on successful login
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Failed to login user" });
  }
});

// Protected route (profile)
router.get("/:id", (req: Request, res: Response) => {
  // Assuming the authenticateUser middleware adds user data to req.user
  try {
    const { userId } = req.params; // TypeScript knows `user` is of type `User` now
    const user = prisma.user.findUnique({
      where: {
        id: +userId,
      },
    });
    res.status(200).json({ user });
  } catch {
    res.status(400).json({ message: "couldn't find user" });
  }
});

export default router;
