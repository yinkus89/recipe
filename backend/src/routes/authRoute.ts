import express from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

// Signup route
router.post("/signup", registerUser);

// Login route
router.post("/login", loginUser);

// Logout route (optional)

export default router;
