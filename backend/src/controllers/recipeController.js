"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecipe = exports.getRecipes = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const getRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield client_1.default.recipe.findMany({ include: { tags: true } });
        res.json(recipes);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching recipes" });
    }
});
exports.getRecipes = getRecipes;
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, instructions, category, tags, ingredients, userId } = req.body;
    try {
        const recipe = yield client_1.default.recipe.create({
            data: {
                title,
                description,
                instructions,
                category,
                userId,
                tags: { connect: tags.map((id) => ({ id })) },
                ingredients: { create: ingredients },
            },
        });
        res.status(201).json(recipe);
    }
    catch (error) {
        res.status(400).json({ error: "Error creating recipe" });
    }
});
exports.createRecipe = createRecipe;
