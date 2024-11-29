import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController";

const router = express.Router();

// Signup route
router.post("/signup", registerUser);  // This will be available at /api/auth/signup

// Login route
router.post("/login", loginUser); // This will be available at /api/auth/login

// Logout route (optional)
router.post("/logout", logoutUser); // This will be available at /api/auth/logout

export default router;
