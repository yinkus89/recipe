import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Register user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Step 1: Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // If user not found, send an error response and exit
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Step 2: Compare password with hashed password stored in DB
    const isMatch = await bcrypt.compare(password, user.password);
    
    // If passwords don't match, send an error response and exit
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Step 3: Generate JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET || "defaultsecretkey", // Ensure you have a secret key
      { expiresIn: "1h" }
    );

    // Step 4: Send the response with the token
    return res.status(200).json({ message: "Login successful", token });
    
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};
// Logout user (optional)
export const logoutUser = (req: Request, res: Response) => {
  // Handle logout (clear token, etc.)
  res.status(200).json({ message: "Logged out successfully" });
};