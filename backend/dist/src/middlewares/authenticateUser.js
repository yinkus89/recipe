"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token from Authorization header
    try {
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY || "default-secret-key");
            req.body = decoded; // Add user data to the request object
            next();
        }
    }
    catch (err) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=authenticateUser.js.map