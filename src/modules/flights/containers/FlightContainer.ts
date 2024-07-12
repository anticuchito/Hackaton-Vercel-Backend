import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { FlightService } from '../services/FlightService';
import { FlightRepository } from '../repositories/FlightRepository';
import { IFlightService } from '../interfaces/IFlightService';
import { IFlightRepository } from '../interfaces/IFlightRepository';
// Registrar PrismaClient
const prisma = new PrismaClient();
container.register<PrismaClient>('PrismaClient', { useValue: prisma });

// Registrar FlightService y FlightRepository
container.registerSingleton<IFlightService>('FlightService', FlightService);
container.registerSingleton<IFlightRepository>('FlightRepository', FlightRepository);
