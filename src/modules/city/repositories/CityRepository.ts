// repositories/CityRepository.ts
import { injectable, inject } from 'tsyringe';
import { PrismaClient, City } from '@prisma/client';
import { ICityRepository } from '../interfaces/ICityRepository';
import { CreateCityDTO } from '../dto/CreateCityDTO';

@injectable()
export class CityRepository implements ICityRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async create(data: CreateCityDTO): Promise<City> {
    return this.prisma.city.create({
      data,
    });
  }

  async findById(id: string): Promise<City | null> {
    return this.prisma.city.findUnique({
      where: { id },
      include: {
        accommodations: true,
        itineraries: true,
        pointsOfInterest: true,
        activities: true,
        restaurants: true,
      },
    });
  }

  async findAll(): Promise<City[]> {
    return this.prisma.city.findMany({
      include: {
        accommodations: true,
        itineraries: true,
        pointsOfInterest: true,
        activities: true,
        restaurants: true,
      },
    });
  }
}
