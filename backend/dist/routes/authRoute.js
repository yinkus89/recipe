"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// Signup route
router.post("/signup", authController_1.registerUser);
// Login route
router.post("/login", authController_1.loginUser);
// Logout route (optional)
router.post("/logout", authController_1.logoutUser);
exports.default = router;
//# sourceMappingURL=authRoute.js.map