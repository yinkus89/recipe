import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function insertData() {
  try {
    // Create a user
    const user = await prisma.user.create({
      data: {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'hashedpassword123', // In production, hash the password
      },
    });

    console.log('Created user:', user);

    // Create a recipe
    const recipe = await prisma.recipe.create({
      data: {
        title: 'Chicken Alfredo',
        description: 'A creamy pasta dish with chicken and alfredo sauce.',
        instructions: '1. Cook pasta. 2. Cook chicken. 3. Prepare the alfredo sauce. 4. Combine everything.',
        imageURL: 'https://example.com/chicken-alfredo.jpg',
        category: 'Italian',
        userId: user.id, // Link the recipe to the user
      },
    });

    console.log('Created recipe:', recipe);

    // Create ingredients for the recipe
    const ingredient1 = await prisma.ingredient.create({
      data: {
        name: 'Chicken breast',
        quantity: 2,
        unit: 'pieces',
        recipeId: recipe.id, // Link ingredient to the recipe
      },
    });

    const ingredient2 = await prisma.ingredient.create({
      data: {
        name: 'Fettucine pasta',
        quantity: 200,
        unit: 'grams',
        recipeId: recipe.id, // Link ingredient to the recipe
      },
    });

    const ingredient3 = await prisma.ingredient.create({
      data: {
        name: 'Alfredo sauce',
        quantity: 1,
        unit: 'cup',
        recipeId: recipe.id, // Link ingredient to the recipe
      },
    });

    console.log('Created ingredients:', [ingredient1, ingredient2, ingredient3]);

    // Create a comment for the recipe
    const comment = await prisma.comment.create({
      data: {
        text: 'This recipe was amazing! I added extra cheese for more flavor.',
        userId: user.id, // Link comment to the user
        recipeId: recipe.id, // Link comment to the recipe
      },
    });

    console.log('Created comment:', comment);

  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await prisma.$disconnect(); // Close Prisma Client connection
  }
}

insertData();
