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
        flights: true,
        accommodations: true,
        itineraryDetails: true,
        restaurants: true,
      },
    });
  }

  async findByCity(city: string): Promise<Trip[]> {
    return this.prisma.trip.findMany({
      where: {
        destination: city,
      },
      select: {
        id: true,
        origin: true,
        destination: true,
        startDate: true,
        endDate: true,
        duration: true,
        budget: true,
        status: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
