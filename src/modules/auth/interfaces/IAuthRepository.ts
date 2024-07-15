import { User, Prisma } from '@prisma/client';

export interface IAuthRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
