import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoute";
import favoritesRoutes from "./routes/favoritesRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import recipesRoutes from "./routes/recipeRoutes"; // Fixed import name here

dotenv.config(); // Load environment variables

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Restrict CORS to your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // If you're using cookies or tokens for authentication
  })
);
app.use(express.json()); // Parse JSON bodies for POST requests

// Routes
app.use("/api/auth", authRoutes); // Auth routes (signup, login)
app.use("/api/user", userRoutes); // User-related routes
app.use("/api/recipes", recipesRoutes); // Recipe-related routes
app.use("/api/favorites", favoritesRoutes); // Favorite recipes routes

// Error handler middleware (it should be at the bottom of your routes)
app.use(errorHandler);

// Check Prisma connection (this is for startup diagnostics)
prisma
  .$connect()
  .then(() => {
    console.log("Prisma is connected to the database.");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
