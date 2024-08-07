import { Itinerary } from '@prisma/client';

export interface IItineraryRepository {
  create(data: Itinerary): Promise<Itinerary>;
  findAll(): Promise<Itinerary[]>;
  findById(id: string): Promise<Itinerary | null>;
  findByCity(city: string): Promise<Itinerary[]>;
  update(id: string, data: Itinerary): Promise<Itinerary>;
  delete(id: string): Promise<void>;
}
