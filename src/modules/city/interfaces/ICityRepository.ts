import { City } from '@prisma/client';
import { CreateCityDTO } from '../dto/CreateCityDTO';

export interface ICityRepository {
  create(data: CreateCityDTO): Promise<City>;
  findById(id: string): Promise<City | null>;
  findByName(name: string): Promise<City | null>; 
  findAll(): Promise<City[]>;
}