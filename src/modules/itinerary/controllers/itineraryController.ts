import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { IItineraryService } from '../interfaces/IItineraryService';
import { ValidationError } from '../../../shared/middlewares/errorMiddleware';

@injectable()
export class ItineraryController {
  constructor(
    @inject('ItineraryService') private itineraryService: IItineraryService
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { day, date, tripId, city } = req.body;
      if (!day || !date || !tripId || !city) {
        throw new ValidationError('Day, date, tripId, and city are required');
      }

      const itinerary = await this.itineraryService.create(req.body);
      res.status(201).json(itinerary);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const itineraries = await this.itineraryService.findAll();
      res.json(itineraries);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const itinerary = await this.itineraryService.findById(id);
      if (itinerary) {
        res.json(itinerary);
      } else {
        res.status(404).json({ message: 'Itinerary not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  async findByCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { city } = req.params;
      const itineraries = await this.itineraryService.findByCity(city);
      res.json(itineraries);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { day, date, tripId, city } = req.body;
      if (!day || !date || !tripId || !city) {
        throw new ValidationError('Day, date, tripId, and city are required');
      }

      const itinerary = await this.itineraryService.update(id, req.body);
      res.json(itinerary);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.itineraryService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
