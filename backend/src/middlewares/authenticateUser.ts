// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token from Authorization header

  try {
    if (token) {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || "default-secret-key"
      );
      req.body = decoded; // Add user data to the request object
      next();
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
