"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const recipeRoutes_1 = __importDefault(require("./routes/recipeRoutes"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoute_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/recipes', recipeRoutes_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map