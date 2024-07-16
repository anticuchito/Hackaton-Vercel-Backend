import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { IFlightService } from '../interfaces/IFlightService';
import { ValidationError } from '../../../shared/middlewares/errorMiddleware';

@injectable()
export class FlightController {
  constructor(
    @inject('FlightService') private flightService: IFlightService
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { airline, flightNumber, departureTime, arrivalTime, price } = req.body;
      if (!airline || !flightNumber || !departureTime || !arrivalTime || price === undefined) {
        throw new ValidationError('Airline, flight number, departure time, arrival time, and price are required');
      }

      const flight = await this.flightService.create(req.body);
      res.status(201).json(flight);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const flights = await this.flightService.findAll();
      res.json(flights);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const flight = await this.flightService.findById(id);
      if (flight) {
        res.json(flight);
      } else {
        res.status(404).json({ message: 'Flight not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { airline, flightNumber, departureTime, arrivalTime, price } = req.body;
      if (!airline || !flightNumber || !departureTime || !arrivalTime || price === undefined) {
        throw new ValidationError('Airline, flight number, departure time, arrival time, and price are required');
      }

      const flight = await this.flightService.update(id, req.body);
      res.json(flight);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.flightService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
