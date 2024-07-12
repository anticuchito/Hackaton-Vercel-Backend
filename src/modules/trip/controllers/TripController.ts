import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { ITripService } from '../interfaces/ITripService';

@injectable()
export class TripController {
  constructor(
    @inject('TripService') private tripService: ITripService
  ) {}

  async createTrip(req: Request, res: Response): Promise<Response> {
    const { origin, destination, startDate, duration, budget } = req.body;
    const trip = await this.tripService.createTrip({
      origin,
      destination,
      startDate: new Date(startDate),
      duration,
      budget,
    });
    return res.status(201).json(trip);
  }
}
