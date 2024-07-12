import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { AccommodationService } from '../services/AccommodationService';
import { AccommodationRepository } from '../repositories/AccommodationRepository';
import { IAccommodationService } from '../interfaces/IAccommodationService';
import { IAccommodationRepository } from '../interfaces/IAccommodationRepository';

// Registrar PrismaClient
const prisma = new PrismaClient();
container.register<PrismaClient>('PrismaClient', { useValue: prisma });

// Registrar AccommodationService y AccommodationRepository
container.registerSingleton<IAccommodationService>('AccommodationService', AccommodationService);
container.registerSingleton<IAccommodationRepository>('AccommodationRepository', AccommodationRepository);
