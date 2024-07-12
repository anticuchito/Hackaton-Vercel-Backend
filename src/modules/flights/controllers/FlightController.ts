import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IFlightService } from '../interfaces/IFlightService';

@injectable()
export class FlightController {
  constructor(
    @inject('FlightService') private flightService: IFlightService
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const flight = await this.flightService.create(req.body);
    return res.status(201).json(flight);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const flights = await this.flightService.findAll();
    return res.json(flights);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const flight = await this.flightService.findById(id);
    if (flight) {
      return res.json(flight);
    }
    return res.status(404).json({ message: 'Flight not found' });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const flight = await this.flightService.update(id, req.body);
    return res.json(flight);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.flightService.delete(id);
    return res.status(204).send();
  }
}
