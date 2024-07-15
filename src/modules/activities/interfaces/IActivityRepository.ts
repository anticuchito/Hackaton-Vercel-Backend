import { Activity } from '@prisma/client';

export interface IActivityRepository {
  create(data: Activity): Promise<Activity>;
  findAll(): Promise<Activity[]>;
  findById(id: string): Promise<Activity | null>;
  findByCity(city: string): Promise<Activity[]>; // Nuevo método
  update(id: string, data: Activity): Promise<Activity>;
  delete(id: string): Promise<void>;
}
