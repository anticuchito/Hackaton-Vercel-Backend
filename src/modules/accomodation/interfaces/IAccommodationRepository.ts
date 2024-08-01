import { Accommodation } from '@prisma/client';

export interface IAccommodationRepository {
  findAll(): Promise<Accommodation[]>;
  findById(id: string): Promise<Accommodation | null>;
  findByCity(city: string): Promise<Accommodation[]>;
  findBySlug(slug: string): Promise<Accommodation | null>;
  create(data: Accommodation): Promise<Accommodation>;
  update(id: string, data: Accommodation): Promise<Accommodation>;
  delete(id: string): Promise<void>;
}