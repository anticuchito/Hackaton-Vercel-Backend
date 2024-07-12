import { injectable, inject } from 'tsyringe';
import { PrismaClient, Trip } from '@prisma/client';
import { ITripRepository } from '../interfaces/ITripRepository';

@injectable()
export class TripRepository implements ITripRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async create(data: Trip): Promise<Trip> {
    return this.prisma.trip.create({
      data,
    });
  }

  async findById(id: string): Promise<Trip | null> {
    return this.prisma.trip.findUnique({
      where: { id },
      include: {
        accommodations: true,
      },
    });
  }
}
