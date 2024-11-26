import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password',
    },
  });

  // Create a recipe
  const recipe = await prisma.recipe.create({
    data: {
      title: 'Spaghetti Bolognese',
      description: 'A classic Italian pasta dish.',
      instructions: 'Cook spaghetti. Make sauce. Combine and serve.',
      category: 'Italian',
      userId: user.id,
      ingredients: {
        create: [
          { name: 'Spaghetti', quantity: 200, unit: 'grams' },
          { name: 'Ground Beef', quantity: 500, unit: 'grams' },
          { name: 'Tomato Sauce', quantity: 300, unit: 'ml' },
        ],
      },
      tags: {
        create: [{ name: 'Pasta' }, { name: 'Comfort Food' }],
      },
    },
  });

  // Add a comment
  await prisma.comment.create({
    data: {
      text: 'This recipe is fantastic!',
      userId: user.id,
      recipeId: recipe.id,
    },
  });

  // Add recipe to user's favorites
  await prisma.recipe.update({
    where: { id: recipe.id },
    data: {
      favoritedBy: {
        connect: { id: user.id },
      },
    },
  });
}

main()
  .then(() => console.log('Database seeded successfully!'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
