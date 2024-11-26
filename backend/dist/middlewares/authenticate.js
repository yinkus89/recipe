"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret_key");
        req.user = decoded; // Ensure req.user is properly set
        console.log("Authenticated user:", req.user); // Debug log
        next();
    }
    catch (error) {
        console.error("Token error:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
exports.authenticate = authenticate;
