import { injectable, inject } from 'tsyringe';
import { PrismaClient, Accommodation } from '@prisma/client';
import { IAccommodationRepository } from '../interfaces/IAccommodationRepository';

@injectable()
export class AccommodationRepository implements IAccommodationRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async findAll(): Promise<Accommodation[]> {
    return this.prisma.accommodation.findMany();
  }

  async findById(id: string): Promise<Accommodation | null> {
    return this.prisma.accommodation.findUnique({ where: { id } });
  }

  async findByCity(city: string): Promise<Accommodation[]> {
    return this.prisma.accommodation.findMany({ where: { city } });
  }

  async create(data: Accommodation): Promise<Accommodation> {
    return this.prisma.accommodation.create({ data });
  }

  async update(id: string, data: Accommodation): Promise<Accommodation> {
    return this.prisma.accommodation.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.accommodation.delete({ where: { id } });
  }
}
