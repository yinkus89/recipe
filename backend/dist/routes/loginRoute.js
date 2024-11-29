"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Adjust import path for your User model
const client_1 = require("@prisma/client");
const express_validator_1 = require("express-validator");
const prisma = new client_1.PrismaClient();
// User login controller
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await prisma.user.findFirst({ where: { name: username } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Create a JWT token (include user data in the payload)
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.name }, // Payload with user id and username
        process.env.JWT_SECRET_KEY || "default-secret-key", // Secret key from env or default
        { expiresIn: "1h" } // Token expiration time
        );
        // Send the token in the response
        return res.json({ token });
    }
    catch (err) {
        console.error("Error during login:", err); // Log error for debugging
        return res.status(500).json({ message: "Server error" });
    }
};
exports.loginUser = loginUser;
// Initialize router
const router = express_1.default.Router();
// Login route
router.post("/login", [
    (0, express_validator_1.body)("username").isString().notEmpty().withMessage("Username is required"),
    (0, express_validator_1.body)("password").isString().notEmpty().withMessage("Password is required"),
], async (req, res) => {
    await (0, exports.loginUser)(req, res); // Call the login controller
});
exports.default = router;
//# sourceMappingURL=loginRoute.js.map