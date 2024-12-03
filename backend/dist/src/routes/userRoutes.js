"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const client_1 = __importDefault(require("../../prisma/client"));
const router = express_1.default.Router();
// Register route
router.post("/registerUser", async (req, res) => {
    try {
        const user = await (0, authController_1.registerUser)(req, res); // Call registerUser with request body
        res.status(201).json({ message: "User registered successfully", user });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Failed to register user" });
    }
});
// Login route
router.post("/login", async (req, res) => {
    try {
        const token = await (0, authController_1.loginUser)(req, res); // Call loginUser with request body
        res.status(200).json({ message: "Login successful", token }); // Send JWT token on successful login
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Failed to login user" });
    }
});
// Protected route (profile)
router.get("/:id", (req, res) => {
    // Assuming the authenticateUser middleware adds user data to req.user
    try {
        const { userId } = req.params; // TypeScript knows `user` is of type `User` now
        const user = client_1.default.user.findUnique({
            where: {
                id: +userId,
            },
        });
        res.status(200).json({ user });
    }
    catch {
        res.status(400).json({ message: "couldn't find user" });
    }
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map