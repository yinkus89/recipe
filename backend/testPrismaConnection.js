const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkConnection() {
  try {
    // Try fetching a record from a model (e.g., 'User')
    const users = await prisma.user.findMany();
    console.log('Database connected successfully. Users:', users);
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkConnection();
