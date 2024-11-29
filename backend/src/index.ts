import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import recipeRoutes from "./routes/recipeRoutes";
import authRoutes from "./routes/authRoute";
import favoritesRoutes from "./routes/favoritesRoutes";
import { PrismaClient } from "@prisma/client";
import errorHandler from "./middlewares/errorHandler";

dotenv.config(); // Load environment variables from .env file

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON requests

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/favorites", favoritesRoutes); // Favorites routes for adding/removing/viewing favorites

// Example route with Prisma interaction
app.get("/api/recipes", async (req: Request, res: Response) => {
  try {
    const recipes = await prisma.recipe.findMany();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
});

// Error handler middleware
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
