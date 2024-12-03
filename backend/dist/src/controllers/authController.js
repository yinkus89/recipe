"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        res.status(201).json({ message: "User registered successfully", user });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};
exports.registerUser = registerUser;
// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt_1.default.compare(password, user?.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user?.id, name: user?.name, email: user?.email }, process.env.JWT_SECRET || "defaultsecretkey", { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};
exports.loginUser = loginUser;
// Logout user (optional)
const logoutUser = (req, res) => {
    // Handle logout (clear token, etc.)
    res.status(200).json({ message: "Logged out successfully" });
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=authController.js.map