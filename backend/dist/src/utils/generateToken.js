"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Utility function to generate JWT token
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, username: user.name }, process.env.JWT_SECRET_KEY || "default-secret-key", // Ensure this is in your .env file
    { expiresIn: "1h" } // Token expiration
    );
};
exports.generateToken = generateToken;
//# sourceMappingURL=generateToken.js.map