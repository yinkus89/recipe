"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
// Environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecretkey";
// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ message: "Name, email, and password are required" });
    }
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Create the user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        return res.status(201).json({
            message: "User registered successfully",
            user: { id: user.id, name: user.name, email: user.email }, // Omit password from response
        });
    }
    catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.registerUser = registerUser;
// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Check if the password matches
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email }, // Payload
        JWT_SECRET, // Secret key
        { expiresIn: "1h" } // Token expiration
        );
        return res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user.id, name: user.name, email: user.email }, // Return user info without password
        });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=userController.js.map