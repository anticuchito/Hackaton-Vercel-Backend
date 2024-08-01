import { injectable, inject } from 'tsyringe';
import { PrismaClient, Restaurant } from '@prisma/client';
import { IRestaurantRepository } from '../interfaces/IRestaurantRepository';

@injectable()
export class RestaurantRepository implements IRestaurantRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async create(data: Restaurant): Promise<Restaurant> {
    return this.prisma.restaurant.create({ data });
  }

  async findAll(): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany();
  }

  async findById(id: string): Promise<Restaurant | null> {
    return this.prisma.restaurant.findUnique({ where: { id } });
  }

  async findByCity(city: string): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany({ where: { city } });
  }

  async findBySlug(slug: string): Promise<Restaurant | null> {
    return this.prisma.restaurant.findUnique({ where: { slug } });
  }

  async update(id: string, data: Restaurant): Promise<Restaurant> {
    return this.prisma.restaurant.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.restaurant.delete({ where: { id } });
  }
}
