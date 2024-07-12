import { injectable, inject } from 'tsyringe';
import { PrismaClient, Flight } from '@prisma/client';
import { IFlightRepository } from '../interfaces/IFlightRepository';

@injectable()
export class FlightRepository implements IFlightRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async create(data: Flight): Promise<Flight> {
    return this.prisma.flight.create({ data });
  }

  async findAll(): Promise<Flight[]> {
    return this.prisma.flight.findMany();
  }

  async findById(id: string): Promise<Flight | null> {
    return this.prisma.flight.findUnique({ where: { id } });
  }

  async update(id: string, data: Flight): Promise<Flight> {
    return this.prisma.flight.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.flight.delete({ where: { id } });
  }
}
