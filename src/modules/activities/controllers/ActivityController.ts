import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { IActivityService } from '../interfaces/IActivityService';
import { ValidationError } from '../../../shared/middlewares/errorMiddleware';

@injectable()
export class ActivityController {
  constructor(
    @inject('ActivityService')
    private activityService: IActivityService
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, description, duration, city, images } = req.body;
      if (!name || !description || duration === undefined || !city || !images || !Array.isArray(images)) {
        throw new ValidationError('Name, description, duration, city, and images are required and images must be an array');
      }

      const activity = await this.activityService.create(req.body);
      res.status(201).json(activity);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const activities = await this.activityService.findAll();
      res.json(activities);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const activity = await this.activityService.findById(id);
      if (activity) {
        res.json(activity);
      } else {
        res.status(404).json({ message: 'Activity not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  async findBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slug } = req.params;
      const activity = await this.activityService.findBySlug(slug);
      if (activity) {
        res.json(activity);
      } else {
        res.status(404).json({ message: 'Activity not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  async findByCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { city } = req.params;
      const activities = await this.activityService.findByCity(city);
      res.json(activities);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description, duration, city, images } = req.body;
      if (!name || !description || duration === undefined || !city || !images || !Array.isArray(images)) {
        throw new ValidationError('Name, description, duration, city, and images are required and images must be an array');
      }

      const activity = await this.activityService.update(id, req.body);
      res.json(activity);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.activityService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
