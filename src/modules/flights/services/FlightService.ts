import { injectable, inject } from 'tsyringe';
import { IFlightService } from '../interfaces/IFlightService';
import { IFlightRepository } from '../interfaces/IFlightRepository';
import { Flight } from '@prisma/client';

@injectable()
export class FlightService implements IFlightService {
  constructor(
    @inject('FlightRepository') private flightRepository: IFlightRepository
  ) {}

  async create(data: Flight): Promise<Flight> {
    return this.flightRepository.create(data);
  }

  async findAll(): Promise<Flight[]> {
    return this.flightRepository.findAll();
  }

  async findById(id: string): Promise<Flight | null> {
    return this.flightRepository.findById(id);
  }

  async update(id: string, data: Flight): Promise<Flight> {
    return this.flightRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.flightRepository.delete(id);
  }
}
