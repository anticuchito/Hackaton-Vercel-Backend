import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { IAccommodationService } from '../interfaces/IAccommodationService';
import { ValidationError } from '../../../shared/middlewares/errorMiddleware';

@injectable()
export class AccommodationController {
  constructor(
    @inject('AccommodationService')
    private accommodationService: IAccommodationService
  ) {}

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const accommodations = await this.accommodationService.findAll();
      res.json(accommodations);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const accommodation = await this.accommodationService.findById(id);
      if (accommodation) {
        res.json(accommodation);
      } else {
        res.status(404).json({ message: 'Accommodation not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  async findBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slug } = req.params;
      const accommodation = await this.accommodationService.findBySlug(slug);
      if (accommodation) {
        res.json(accommodation);
      } else {
        res.status(404).json({ message: 'Accommodation not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  async findByCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { city } = req.params;
      const accommodations = await this.accommodationService.findByCity(city);
      res.json(accommodations);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, address, price, city, images } = req.body;
      if (!name || !address || price === undefined || !city || !images || !Array.isArray(images)) {
        throw new ValidationError('Name, address, price, city, and images are required and images must be an array');
      }

      const accommodation = await this.accommodationService.create(req.body);
      res.status(201).json(accommodation);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { name, address, price, city, images } = req.body;
      if (!name || !address || price === undefined || !city || !images || !Array.isArray(images)) {
        throw new ValidationError('Name, address, price, city, and images are required and images must be an array');
      }

      const accommodation = await this.accommodationService.update(id, req.body);
      res.json(accommodation);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.accommodationService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
