"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateUser_1 = require("../middlewares/authenticateUser");
const favoriteController_1 = require("../controllers/favoriteController");
const express_validator_1 = require("express-validator"); // Import validation middleware for route parameters
const router = (0, express_1.Router)();
// Route to get all favorites
router.get("/", authenticateUser_1.authenticateUser, favoriteController_1.getFavorites);
// Route to add a favorite (POST to /favorites)
router.post("/", authenticateUser_1.authenticateUser, favoriteController_1.addFavorite);
// Route to remove a favorite (DELETE to /favorites/:recipeId)
router.delete("/:recipeId", // Change the route to be RESTful
authenticateUser_1.authenticateUser, (0, express_validator_1.param)("recipeId").isInt().withMessage("Invalid recipe ID"), // Validate that recipeId is an integer
favoriteController_1.removeFavorite);
exports.default = router;
//# sourceMappingURL=favoritesRoutes.js.map