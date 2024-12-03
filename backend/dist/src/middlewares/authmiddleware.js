"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET_KEY || "default-secret-key";
// Middleware to verify the JWT token and authenticate the user
const verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    // Check if the token is provided
    if (!token) {
        res.status(403).json({ message: "No token provided" });
        return;
    }
    try {
        // Verify the JWT token and extract the payload
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Find the user by ID from the decoded token
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        // If no user is found, send a 404 response
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Attach the user to the request object for further use
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    }
    catch (err) {
        console.error("Error verifying token:", err); // Log the error details for debugging
        res.status(401).json({ message: "Invalid or expired token" });
        return;
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=authmiddleware.js.map