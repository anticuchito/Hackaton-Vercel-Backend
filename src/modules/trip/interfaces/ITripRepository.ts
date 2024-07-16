import { Trip } from '@prisma/client';

export interface ITripRepository {
  create(data: Trip): Promise<Trip>;
  findById(id: string): Promise<Trip | null>;
  findByCity(city: string): Promise<Trip[]>;
  update(id: string, data: Trip): Promise<Trip>;
  delete(id: string): Promise<void>;
}
