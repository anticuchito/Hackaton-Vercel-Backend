import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { ITripService } from '../interfaces/ITripService';
import { ValidationError } from '../../../shared/middlewares/errorMiddleware';

@injectable()
export class TripController {
  constructor(
    @inject('TripService') private tripService: ITripService
  ) {}

  async createTrip(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { origin, destination, startDate, duration, budget } = req.body;
      if (!origin || !destination || !startDate || duration === undefined || budget === undefined) {
        throw new ValidationError('Origin, destination, startDate, duration, and budget are required');
      }
      
      const trip = await this.tripService.createTrip({
        origin,
        destination,
        startDate: new Date(startDate),
        duration,
        budget,
      });
      res.status(201).json(trip);
    } catch (error) {
      next(error);
    }
  }

  async getTripById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const trip = await this.tripService.getTripById(id);
      if (trip) {
        res.json(trip);
      } else {
        res.status(404).json({ message: 'Trip not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  async getTripsByCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { city } = req.params;
      const trips = await this.tripService.getTripsByCity(city);
      res.json(trips);
    } catch (error) {
      next(error);
    }
  }

  async updateTrip(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { origin, destination, startDate, endDate, duration, budget, status, notes } = req.body;
      if (!origin || !destination || !startDate || !endDate || duration === undefined || budget === undefined || !status) {
        throw new ValidationError('Origin, destination, startDate, endDate, duration, budget, and status are required');
      }
      
      const trip = await this.tripService.updateTrip(id, {
        origin,
        destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        duration,
        budget,
        status,
        notes,
      });
      res.json(trip);
    } catch (error) {
      next(error);
    }
  }

  async deleteTrip(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.tripService.deleteTrip(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
