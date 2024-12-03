import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

// Utility function to generate JWT token
export const generateToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, username: user.name },
    process.env.JWT_SECRET_KEY || "default-secret-key", // Ensure this is in your .env file
    { expiresIn: "1h" } // Token expiration
  );
};
