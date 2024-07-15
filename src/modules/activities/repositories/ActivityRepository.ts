import { injectable, inject } from 'tsyringe';
import { PrismaClient, Activity } from '@prisma/client';
import { IActivityRepository } from '../interfaces/IActivityRepository';

@injectable()
export class ActivityRepository implements IActivityRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async create(data: Activity): Promise<Activity> {
    return this.prisma.activity.create({ data });
  }

  async findAll(): Promise<Activity[]> {
    return this.prisma.activity.findMany();
  }

  async findById(id: string): Promise<Activity | null> {
    return this.prisma.activity.findUnique({ where: { id } });
  }

  async findByCity(city: string): Promise<Activity[]> {
    return this.prisma.activity.findMany({ where: { city } });
  }

  async update(id: string, data: Activity): Promise<Activity> {
    return this.prisma.activity.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.activity.delete({ where: { id } });
  }
}
