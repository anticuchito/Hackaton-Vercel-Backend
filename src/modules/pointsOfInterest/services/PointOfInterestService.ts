import { injectable, inject } from 'tsyringe';
import { IPointOfInterestService } from '../interfaces/IPointOfInterestService';
import { IPointOfInterestRepository } from '../interfaces/IPointOfInterestRepository';
import { PointOfInterest } from '@prisma/client';

@injectable()
export class PointOfInterestService implements IPointOfInterestService {
  constructor(
    @inject('PointOfInterestRepository')
    private pointOfInterestRepository: IPointOfInterestRepository
  ) {}

  async create(data: PointOfInterest): Promise<PointOfInterest> {
    data.slug = this.generateSlug(data.name);
    return this.pointOfInterestRepository.create(data);
  }

  async findAll(): Promise<PointOfInterest[]> {
    return this.pointOfInterestRepository.findAll();
  }

  async findById(id: string): Promise<PointOfInterest | null> {
    return this.pointOfInterestRepository.findById(id);
  }

  async findByCity(city: string): Promise<PointOfInterest[]> {
    return this.pointOfInterestRepository.findByCity(city);
  }

  async findBySlug(slug: string): Promise<PointOfInterest | null> {
    return this.pointOfInterestRepository.findBySlug(slug);
  }

  async update(id: string, data: PointOfInterest): Promise<PointOfInterest> {
    data.slug = this.generateSlug(data.name);
    return this.pointOfInterestRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.pointOfInterestRepository.delete(id);
  }

  private generateSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }
}
