import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: "hashed_password",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane@example.com",
      password: "hashed_password",
    },
  });

  // Create Tags
  const tag1 = await prisma.tag.create({ data: { name: "Vegan" } });
  const tag2 = await prisma.tag.create({ data: { name: "Dessert" } });

  // Create Recipe
  const recipe = await prisma.recipe.create({
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
  await prisma.ingredient.createMany({
    data: [
      { name: "Flour", quantity: 2, unit: "cups", recipeId: recipe.id },
      { name: "Cocoa Powder", quantity: 0.5, unit: "cup", recipeId: recipe.id },
    ],
  });

  // Add Comments
  await prisma.comment.create({
    data: {
      text: "This is amazing!",
      userId: user2.id,
      recipeId: recipe.id,
    },
  });

  console.log("Database seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
