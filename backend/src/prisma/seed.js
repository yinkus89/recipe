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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create Users
        const user1 = yield prisma.user.create({
            data: {
                name: "John Doe",
                email: "john@example.com",
                password: "hashed_password",
            },
        });
        const user2 = yield prisma.user.create({
            data: {
                name: "Jane Smith",
                email: "jane@example.com",
                password: "hashed_password",
            },
        });
        // Create Tags
        const tag1 = yield prisma.tag.create({ data: { name: "Vegan" } });
        const tag2 = yield prisma.tag.create({ data: { name: "Dessert" } });
        // Create Recipe
        const recipe = yield prisma.recipe.create({
            data: {
                title: "Vegan Chocolate Cake",
                description: "A rich and moist vegan chocolate cake.",
                instructions: "Mix, bake, and enjoy!",
                category: "Dessert",
                userId: user1.id,
                tags: { connect: [{ id: tag1.id }, { id: tag2.id }] },
            },
        });
        // Add Ingredients
        yield prisma.ingredient.createMany({
            data: [
                { name: "Flour", quantity: 2, unit: "cups", recipeId: recipe.id },
                { name: "Cocoa Powder", quantity: 0.5, unit: "cup", recipeId: recipe.id },
            ],
        });
        // Add Comments
        yield prisma.comment.create({
            data: {
                text: "This is amazing!",
                userId: user2.id,
                recipeId: recipe.id,
            },
        });
        console.log("Database seeded!");
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
