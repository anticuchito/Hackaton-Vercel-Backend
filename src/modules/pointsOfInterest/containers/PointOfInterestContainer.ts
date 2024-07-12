
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { PointOfInterestService } from '../services/PointOfInterestService';
import { PointOfInterestRepository } from '../repositories/PointOfInterestRepository';
import { IPointOfInterestService } from '../interfaces/IPointOfInterestService';
import { IPointOfInterestRepository } from '../interfaces/IPointOfInterestRepository';

// Registrar PrismaClient si no está ya registrado
const prisma = new PrismaClient();
container.register<PrismaClient>('PrismaClient', { useValue: prisma });

// Registrar PointOfInterestService y PointOfInterestRepository
container.registerSingleton<IPointOfInterestService>('PointOfInterestService', PointOfInterestService);
container.registerSingleton<IPointOfInterestRepository>('PointOfInterestRepository', PointOfInterestRepository);
