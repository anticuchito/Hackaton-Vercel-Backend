import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { ActivityService } from '../services/ActivityService';
import { ActivityRepository } from '../repositories/ActivityRepository';
import { IActivityService } from '../interfaces/IActivityService';
import { IActivityRepository } from '../interfaces/IActivityRepository';

// Registrar PrismaClient si no está ya registrado
const prisma = new PrismaClient();
container.register<PrismaClient>('PrismaClient', { useValue: prisma });

// Registrar ActivityService y ActivityRepository
container.registerSingleton<IActivityService>('ActivityService', ActivityService);
container.registerSingleton<IActivityRepository>('ActivityRepository', ActivityRepository);
