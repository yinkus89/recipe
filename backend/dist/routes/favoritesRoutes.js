"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/favorites.ts
const express_1 = require("express");
const favoriteController_1 = require("controllers/favoriteController");
const router = (0, express_1.Router)();
// Define route for fetching favorite recipes
router.get("/favorites", favoriteController_1.getFavorites);
exports.default = router;
