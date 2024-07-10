// src/index.ts

import app from './app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Connected to the database successfully.');

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  } finally {
    process.on('SIGINT', async () => {
      await prisma.$disconnect();
      console.log('Disconnected from the database.');
      process.exit(0);
    });
  }
}

main();
