import { injectable, inject } from 'tsyringe';
import { PrismaClient, User, Prisma } from '@prisma/client';
import { IUserRepository } from '../interfaces/IUserRepository';

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
