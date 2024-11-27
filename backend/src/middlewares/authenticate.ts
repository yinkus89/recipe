import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
    req.user = decoded as { id: string }; // Ensure req.user is properly set
    console.log("Authenticated user:", req.user); // Debug log
    next();
  } catch (error) {
    console.error("Token error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
