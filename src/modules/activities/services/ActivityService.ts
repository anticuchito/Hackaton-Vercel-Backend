import { injectable, inject } from 'tsyringe';
import { IActivityService } from '../interfaces/IActivityService';
import { IActivityRepository } from '../interfaces/IActivityRepository';
import { Activity } from '@prisma/client';

@injectable()
export class ActivityService implements IActivityService {
  constructor(
    @inject('ActivityRepository')
    private activityRepository: IActivityRepository
  ) {}

  async create(data: Activity): Promise<Activity> {
    data.slug = this.generateSlug(data.name);
    return this.activityRepository.create(data);
  }

  async findAll(): Promise<Activity[]> {
    return this.activityRepository.findAll();
  }

  async findById(id: string): Promise<Activity | null> {
    return this.activityRepository.findById(id);
  }

  async findByCity(city: string): Promise<Activity[]> {
    return this.activityRepository.findByCity(city);
  }

  async findBySlug(slug: string): Promise<Activity | null> {
    return this.activityRepository.findBySlug(slug);
  }

  async update(id: string, data: Activity): Promise<Activity> {
    data.slug = this.generateSlug(data.name);
    return this.activityRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.activityRepository.delete(id);
  }

  private generateSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }
}
