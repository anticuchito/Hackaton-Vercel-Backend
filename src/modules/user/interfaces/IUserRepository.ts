import { User } from '@prisma/client';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  update(userId: string, data: Partial<User>): Promise<User>;
}
