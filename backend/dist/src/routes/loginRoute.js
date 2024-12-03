"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const express_validator_1 = require("express-validator");
// Initialize Prisma Client
const prisma = new client_1.PrismaClient();
// Helper function to handle validation errors
const handleValidationErrors = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return true; // Indicates that there were validation errors
    }
    return false;
};
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
        // Check if JWT secret is defined
        const jwtSecret = process.env.JWT_SECRET_KEY;
        if (!jwtSecret) {
            console.error("JWT secret key is not defined");
            return res.status(500).json({ message: "Server error, JWT secret missing" });
        }
        // Create a JWT token (include user data in the payload)
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.name }, // Payload with user id and username
        jwtSecret, // Secret key from env or default
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
// Login route with validation and error handling
router.post("/api/login", [
    (0, express_validator_1.body)("username").isString().notEmpty().withMessage("Username is required"),
    (0, express_validator_1.body)("password").isString().notEmpty().withMessage("Password is required"),
], (req, res) => {
    // Check for validation errors
    if (handleValidationErrors(req, res))
        return;
    // Call the login controller
    (0, exports.loginUser)(req, res);
});
exports.default = router;
//# sourceMappingURL=loginRoute.js.map