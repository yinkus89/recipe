import { User } from '@prisma/client'; // If you're using Prisma Client generated types


declare global {
  namespace Express {
    interface Request {
      user?: User;  // The `user` property will now be available on the `Request` object
    }
  }
}
