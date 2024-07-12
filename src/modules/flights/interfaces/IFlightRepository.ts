import { Flight } from '@prisma/client';

export interface IFlightRepository {
  create(data: Flight): Promise<Flight>;
  findAll(): Promise<Flight[]>;
  findById(id: string): Promise<Flight | null>;
  update(id: string, data: Flight): Promise<Flight>;
  delete(id: string): Promise<void>;
}
