import { injectable, inject } from 'tsyringe';
import { PrismaClient, PointOfInterest } from '@prisma/client';
import { IPointOfInterestRepository } from '../interfaces/IPointOfInterestRepository';

@injectable()
export class PointOfInterestRepository implements IPointOfInterestRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async create(data: PointOfInterest): Promise<PointOfInterest> {
    return this.prisma.pointOfInterest.create({ data });
  }

  async findAll(): Promise<PointOfInterest[]> {
    return this.prisma.pointOfInterest.findMany();
  }

  async findById(id: string): Promise<PointOfInterest | null> {
    return this.prisma.pointOfInterest.findUnique({ where: { id } });
  }

  async findByCity(city: string): Promise<PointOfInterest[]> {
    return this.prisma.pointOfInterest.findMany({ where: { city } });
  }

  async update(id: string, data: PointOfInterest): Promise<PointOfInterest> {
    return this.prisma.pointOfInterest.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.pointOfInterest.delete({ where: { id } });
  }
}
