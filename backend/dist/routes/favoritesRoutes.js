"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/favoriteRoutes.ts
const express_1 = require("express");
const authenticateUser_1 = require("../middlewares/authenticateUser");
const favoriteController_1 = require("../controllers/favoriteController");
const router = (0, express_1.Router)();
// Route to get all favorites
router.get("/", authenticateUser_1.authenticateUser, favoriteController_1.getFavorites);
// Route to add a favorite
router.post("/add", authenticateUser_1.authenticateUser, favoriteController_1.addFavorite);
// Route to remove a favorite
router.delete("/remove/:recipeId", authenticateUser_1.authenticateUser, favoriteController_1.removeFavorite);
exports.default = router;
//# sourceMappingURL=favoritesRoutes.js.map