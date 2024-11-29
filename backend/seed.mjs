import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: { name: 'John Doe', email: 'john@example.com', password: 'hashed_password' },
  });
  const user2 = await prisma.user.create({
    data: { name: 'Jane Smith', email: 'jane@example.com', password: 'hashed_password' },
  });
  const user3 = await prisma.user.create({
    data: { name: 'Alice Johnson', email: 'alice@example.com', password: 'hashed_password' },
  });
  const user4 = await prisma.user.create({
    data: { name: 'Bob Brown', email: 'bob@example.com', password: 'hashed_password' },
  });

  console.log('Users created!');

  // Create Tags
  const tag1 = await prisma.tag.create({
    data: { name: 'Dessert' },
  });
  const tag2 = await prisma.tag.create({
    data: { name: 'Main' },
  });
  const tag3 = await prisma.tag.create({
    data: { name: 'Vegan' },
  });
  const tag4 = await prisma.tag.create({
    data: { name: 'Gluten-Free' },
  });

  console.log('Tags created!');

  // Create Recipes
  const recipe1 = await prisma.recipe.create({
    data: {
      title: 'Chocolate Cake',
      description: 'A rich and delicious chocolate cake.',
      instructions: 'Mix ingredients and bake at 350°F for 30 minutes.',
      category: 'Dessert',
      userId: user1.id,
      tags: { connect: [{ id: tag1.id }] },
    },
  });

  const recipe2 = await prisma.recipe.create({
    data: {
      title: 'Spaghetti Bolognese',
      description: 'A classic Italian pasta dish with rich tomato sauce.',
      instructions: 'Cook pasta, make sauce, and combine.',
      category: 'Main',
      userId: user2.id,
      tags: { connect: [{ id: tag2.id }] },
    },
  });

  const recipe3 = await prisma.recipe.create({
    data: {
      title: 'Vegan Salad',
      description: 'A fresh and light vegan salad with quinoa and veggies.',
      instructions: 'Toss the veggies and quinoa with olive oil and lemon juice.',
      category: 'Vegan',
      userId: user3.id,
      tags: { connect: [{ id: tag3.id }] },
    },
  });

  const recipe4 = await prisma.recipe.create({
    data: {
      title: 'Gluten-Free Pizza',
      description: 'A gluten-free pizza with fresh toppings.',
      instructions: 'Bake pizza crust, add toppings, and bake again.',
      category: 'Gluten-Free',
      userId: user4.id,
      tags: { connect: [{ id: tag4.id }] },
    },
  });

  console.log('Recipes created!');

  // Create Ingredients
  const ingredient1 = await prisma.ingredient.create({
    data: {
      name: 'Flour',
      quantity: 2.5,
      unit: 'cups',
      recipeId: recipe1.id,
    },
  });
  const ingredient2 = await prisma.ingredient.create({
    data: {
      name: 'Tomatoes',
      quantity: 4,
      unit: 'pieces',
      recipeId: recipe2.id,
    },
  });
  const ingredient3 = await prisma.ingredient.create({
    data: {
      name: 'Lettuce',
      quantity: 1,
      unit: 'head',
      recipeId: recipe3.id,
    },
  });
  const ingredient4 = await prisma.ingredient.create({
    data: {
      name: 'Gluten-Free Flour',
      quantity: 3,
      unit: 'cups',
      recipeId: recipe4.id,
    },
  });

  console.log('Ingredients created!');

  // Create Comments
  await prisma.comment.create({
    data: {
      text: 'This cake is amazing!',
      userId: user2.id,
      recipeId: recipe1.id,
    },
  });

  await prisma.comment.create({
    data: {
      text: 'Loved this vegan salad!',
      userId: user1.id,
      recipeId: recipe3.id,
    },
  });

  await prisma.comment.create({
    data: {
      text: 'The pizza crust is perfect!',
      userId: user4.id,
      recipeId: recipe4.id,
    },
  });

  await prisma.comment.create({
    data: {
      text: 'Very tasty and easy to make.',
      userId: user3.id,
      recipeId: recipe2.id,
    },
  });

  console.log('Comments created!');
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
