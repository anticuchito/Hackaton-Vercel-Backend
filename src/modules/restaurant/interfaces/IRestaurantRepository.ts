import { Restaurant } from '@prisma/client';

export interface IRestaurantRepository {
  create(data: Restaurant): Promise<Restaurant>;
  findAll(): Promise<Restaurant[]>;
  findById(id: string): Promise<Restaurant | null>;
  findByCity(city: string): Promise<Restaurant[]>; 
  update(id: string, data: Restaurant): Promise<Restaurant>;
  delete(id: string): Promise<void>;
}
