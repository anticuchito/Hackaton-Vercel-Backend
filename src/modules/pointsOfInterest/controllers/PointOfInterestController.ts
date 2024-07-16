import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { IPointOfInterestService } from '../interfaces/IPointOfInterestService';
import { ValidationError } from '../../../shared/middlewares/errorMiddleware';

@injectable()
export class PointOfInterestController {
  constructor(
    @inject('PointOfInterestService')
    private pointOfInterestService: IPointOfInterestService
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, description, type, city, images } = req.body;
      if (!name || !description || !type || !city || !images || !Array.isArray(images)) {
        throw new ValidationError('Name, description, type, city, and images are required and images must be an array');
      }

      const pointOfInterest = await this.pointOfInterestService.create(req.body);
      res.status(201).json(pointOfInterest);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pointsOfInterest = await this.pointOfInterestService.findAll();
      res.json(pointsOfInterest);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const pointOfInterest = await this.pointOfInterestService.findById(id);
      if (pointOfInterest) {
        res.json(pointOfInterest);
      } else {
        res.status(404).json({ message: 'Point of Interest not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  async findByCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { city } = req.params;
      const pointsOfInterest = await this.pointOfInterestService.findByCity(city);
      res.json(pointsOfInterest);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description, type, city, images } = req.body;
      if (!name || !description || !type || !city || !images || !Array.isArray(images)) {
        throw new ValidationError('Name, description, type, city, and images are required and images must be an array');
      }

      const pointOfInterest = await this.pointOfInterestService.update(id, req.body);
      res.json(pointOfInterest);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.pointOfInterestService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
