import { injectable, inject } from 'tsyringe';
import { IItineraryService } from '../interfaces/IItineraryService';
import { IItineraryRepository } from '../interfaces/IItineraryRepository';
import { Itinerary } from '@prisma/client';

@injectable()
export class ItineraryService implements IItineraryService {
  constructor(
    @inject('ItineraryRepository') private itineraryRepository: IItineraryRepository
  ) {}

  async create(data: Itinerary): Promise<Itinerary> {
    return this.itineraryRepository.create(data);
  }

  async findAll(): Promise<Itinerary[]> {
    return this.itineraryRepository.findAll();
  }

  async findById(id: string): Promise<Itinerary | null> {
    return this.itineraryRepository.findById(id);
  }

  async findByCity(city: string): Promise<Itinerary[]> {
    return this.itineraryRepository.findByCity(city);
  }

  async update(id: string, data: Itinerary): Promise<Itinerary> {
    return this.itineraryRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.itineraryRepository.delete(id);
  }
}
