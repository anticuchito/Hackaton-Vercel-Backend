// repositories/RevokedTokenRepository.ts
import { injectable, inject } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { IRevokedTokenRepository } from '../interfaces/IRevokedTokenRepository';

@injectable()
export class RevokedTokenRepository implements IRevokedTokenRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async create(token: string): Promise<void> {
    await this.prisma.revokedToken.create({
      data: { token },
    });
  }

  async find(token: string): Promise<boolean> {
    const revokedToken = await this.prisma.revokedToken.findUnique({
      where: { token },
    });
    return !!revokedToken;
  }
}
