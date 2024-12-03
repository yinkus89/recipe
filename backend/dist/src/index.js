"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const favoritesRoutes_1 = __importDefault(require("./routes/favoritesRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const recipeRoutes_1 = __importDefault(require("./routes/recipeRoutes")); // Fixed import name here
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Restrict CORS to your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // If you're using cookies or tokens for authentication
}));
app.use(express_1.default.json()); // Parse JSON bodies for POST requests
// Routes
app.use('/api/auth', authRoute_1.default); // Auth routes (signup, login)
app.use('/api/user', userRoutes_1.default); // User-related routes
app.use('/api/recipes', recipeRoutes_1.default); // Recipe-related routes
app.use('/api/favorites', favoritesRoutes_1.default); // Favorite recipes routes
// Error handler middleware (it should be at the bottom of your routes)
app.use(errorHandler_1.errorHandler);
// Check Prisma connection (this is for startup diagnostics)
prisma.$connect()
    .then(() => {
    console.log('Prisma is connected to the database.');
})
    .catch((error) => {
    console.error('Failed to connect to the database:', error);
});
// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map