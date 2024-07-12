import { Activity } from '@prisma/client';

export interface IActivityService {
  create(data: Activity): Promise<Activity>;
  findAll(): Promise<Activity[]>;
  findById(id: string): Promise<Activity | null>;
  update(id: string, data: Activity): Promise<Activity>;
  delete(id: string): Promise<void>;
}
