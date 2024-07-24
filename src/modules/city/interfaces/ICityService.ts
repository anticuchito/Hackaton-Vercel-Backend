import { City } from '@prisma/client';

export interface ICityService {
  createCity(data: {
    name: string;
    country: string;
  }): Promise<City>;
  getCityById(id: string): Promise<City | null>;
  getAllCities(): Promise<City[]>;
}