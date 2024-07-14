import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { TripService } from '../services/TripService';
import { TripRepository } from '../repositories/TripRepository';
import { ITripService } from '../interfaces/ITripService';
import { IUserService } from '../../user/interfaces/IUserService';
import { UserService } from '../../user/services/UserService';

import { ITripRepository } from '../interfaces/ITripRepository';

// Registrar PrismaClient
const prisma = new PrismaClient();
container.register<PrismaClient>('PrismaClient', { useValue: prisma });

// Registrar TripService y TripRepository
container.registerSingleton<ITripService>('TripService', TripService);
container.registerSingleton<ITripRepository>('TripRepository', TripRepository);

container.registerSingleton<IUserService>('UserService', UserService);
