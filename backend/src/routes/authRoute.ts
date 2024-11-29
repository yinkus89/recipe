import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController";

const router = express.Router();

// Signup route
router.post("/signup", registerUser);

// Login route
router.post("/login", loginUser);

// Logout route (optional)
router.post("/logout", logoutUser);

export default router;
