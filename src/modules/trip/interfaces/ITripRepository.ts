import { Trip } from '@prisma/client';
export interface ITripRepository {
  create(data: Trip): Promise<Trip>;
  findById(id: string): Promise<Trip | null>;
  findByCity(city: string): Promise<Trip[]>;
}