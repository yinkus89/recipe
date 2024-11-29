import express, { Request, Response } from "express";
import prisma from "../../prisma/client";
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

// Register route
router.post("/api/auth/registerUser", async (req: Request, res: Response) => {
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
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Failed to login user" });
  }
});

// Protected route (profile)
router.get("/:id", async (req: Request, res: Response) => {  // Specify types for req and res
  try {
    const { id } = req.params;  // Extract `id` from route parameter

    // Fetch the user by ID using Prisma
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) }, // Convert the ID to integer
    });

    // If the user is not found, return 404 error
    if (!user) {
       res.status(404).json({ message: "User not found" });
    }

    // If user is found, send the user data
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
});

export default router;
