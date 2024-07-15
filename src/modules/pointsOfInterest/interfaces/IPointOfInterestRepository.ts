import { PointOfInterest } from '@prisma/client';

export interface IPointOfInterestRepository {
  create(data: PointOfInterest): Promise<PointOfInterest>;
  findAll(): Promise<PointOfInterest[]>;
  findById(id: string): Promise<PointOfInterest | null>;
  findByCity(city: string): Promise<PointOfInterest[]>;
  update(id: string, data: PointOfInterest): Promise<PointOfInterest>;
  delete(id: string): Promise<void>;
}
