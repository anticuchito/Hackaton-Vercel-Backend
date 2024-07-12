import { Accommodation } from '@prisma/client';

export interface IAccommodationService {
  findAll(): Promise<Accommodation[]>;
  findById(id: string): Promise<Accommodation | null>;
  create(data: Accommodation): Promise<Accommodation>;
  update(id: string, data: Accommodation): Promise<Accommodation>;
  delete(id: string): Promise<void>;
}
