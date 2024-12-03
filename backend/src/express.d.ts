// src/types/express/index.d.ts

import { User } from '@prisma/client'; // Import the User type from Prisma

declare global {
  namespace Express {
    interface Request {
      user?: User; // Use Prisma's User type for the user property
    }
  }
}
