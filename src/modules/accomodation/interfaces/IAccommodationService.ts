import { Accommodation } from '@prisma/client';

export interface IAccommodationService {
  findAll(): Promise<Accommodation[]>;
  findById(id: string): Promise<Accommodation | null>;
  findByCity(city: string): Promise<Accommodation[]>; 
  create(data: Accommodation): Promise<Accommodation>;
  update(id: string, data: Accommodation): Promise<Accommodation>;
  delete(id: string): Promise<void>;
}
