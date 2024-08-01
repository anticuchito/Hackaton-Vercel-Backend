import { injectable, inject } from 'tsyringe';
import { IRestaurantService } from '../interfaces/IRestaurantService';
import { IRestaurantRepository } from '../interfaces/IRestaurantRepository';
import { Restaurant } from '@prisma/client';

@injectable()
export class RestaurantService implements IRestaurantService {
  constructor(
    @inject('RestaurantRepository')
    private restaurantRepository: IRestaurantRepository
  ) {}

  async create(data: Restaurant): Promise<Restaurant> {
    data.slug = this.generateSlug(data.name);
    return this.restaurantRepository.create(data);
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.findAll();
  }

  async findById(id: string): Promise<Restaurant | null> {
    return this.restaurantRepository.findById(id);
  }

  async findByCity(city: string): Promise<Restaurant[]> {
    return this.restaurantRepository.findByCity(city);
  }

  async findBySlug(slug: string): Promise<Restaurant | null> {
    return this.restaurantRepository.findBySlug(slug);
  }

  async update(id: string, data: Restaurant): Promise<Restaurant> {
    data.slug = this.generateSlug(data.name);
    return this.restaurantRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.restaurantRepository.delete(id);
  }

  private generateSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }
}
