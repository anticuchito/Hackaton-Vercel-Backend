import { injectable, inject } from 'tsyringe';
import { IAccommodationService } from '../interfaces/IAccommodationService';
import { IAccommodationRepository } from '../interfaces/IAccommodationRepository';
import { Accommodation } from '@prisma/client';

@injectable()
export class AccommodationService implements IAccommodationService {
  constructor(
    @inject('AccommodationRepository')
    private accommodationRepository: IAccommodationRepository
  ) {}

  async findAll(): Promise<Accommodation[]> {
    return this.accommodationRepository.findAll();
  }

  async findById(id: string): Promise<Accommodation | null> {
    return this.accommodationRepository.findById(id);
  }

  async findByCity(city: string): Promise<Accommodation[]> {
    return this.accommodationRepository.findByCity(city);
  }

  async create(data: Accommodation): Promise<Accommodation> {
    return this.accommodationRepository.create(data);
  }

  async update(id: string, data: Accommodation): Promise<Accommodation> {
    return this.accommodationRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.accommodationRepository.delete(id);
  }
}
