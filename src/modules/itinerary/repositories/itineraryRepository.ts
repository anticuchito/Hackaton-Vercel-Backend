import { injectable, inject } from 'tsyringe';
import { PrismaClient, Itinerary } from '@prisma/client';
import { IItineraryRepository } from '../interfaces/IItineraryRepository';

@injectable()
export class ItineraryRepository implements IItineraryRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async create(data: Itinerary): Promise<Itinerary> {
    return this.prisma.itinerary.create({ data });
  }

  async findAll(): Promise<Itinerary[]> {
    return this.prisma.itinerary.findMany();
  }

  async findById(id: string): Promise<Itinerary | null> {
    return this.prisma.itinerary.findUnique({
      where: { id },
      include: {
        activities: { include: { activity: true } },
        pointsOfInterest: { include: { pointOfInterest: true } },
        accommodations: true,
      },
    });
  }

  async findByCity(city: string): Promise<Itinerary[]> {
    return this.prisma.itinerary.findMany({
      where: { city },
      include: {
        activities: { include: { activity: true } },
        pointsOfInterest: { include: { pointOfInterest: true } },
        accommodations: true,
      },
    });
  }

  async update(id: string, data: Itinerary): Promise<Itinerary> {
    return this.prisma.itinerary.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.itinerary.delete({ where: { id } });
  }
}
