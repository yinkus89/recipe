"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const recipeRoutes_1 = __importDefault(require("./routes/recipeRoutes"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const favoritesRoutes_1 = __importDefault(require("./routes/favoritesRoutes")); // Import favorites routes
const client_1 = require("@prisma/client");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler")); // Import error handler middleware
dotenv_1.default.config(); // Load environment variables from .env file
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // to parse JSON requests
// Routes
app.use("/api/auth", authRoute_1.default); // Auth routes for signup, login, logout
app.use("/api/users", userRoutes_1.default);
app.use("/api/recipes", recipeRoutes_1.default);
app.use("/api/favorites", favoritesRoutes_1.default); // Favorites routes for adding/removing/viewing favorites
// Error handler middleware
app.use(errorHandler_1.default);
// Start the server
const port = process.env.PORT || 5432;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map