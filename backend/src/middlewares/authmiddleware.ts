// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET_KEY || "default-secret-key";

// Middleware to verify the JWT token and authenticate the user
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["authorization"]?.split(" ")[1];

  // Check if the token is provided
  if (!token) {
     res.status(403).json({ message: "No token provided" });
     return
  }

  try {
    // Verify the JWT token and extract the payload
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { id: number };
    
    // Find the user by ID from the decoded token
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    // If no user is found, send a 404 response
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return
    }

    // Attach the user to the request object for further use
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Error verifying token:", err); // Log the error details for debugging
     res.status(401).json({ message: "Invalid or expired token" });
     return
  }
};
