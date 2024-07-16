import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { ItineraryService } from '../services/itineraryService';
import { ItineraryRepository } from '../repositories/itineraryRepository';
import { IItineraryService } from '../interfaces/IItineraryService';
import { IItineraryRepository } from '../interfaces/IItineraryRepository';

const prisma = new PrismaClient();
container.register<PrismaClient>('PrismaClient', { useValue: prisma });

container.registerSingleton<IItineraryService>('ItineraryService', ItineraryService);
container.registerSingleton<IItineraryRepository>('ItineraryRepository', ItineraryRepository);
