import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { RestaurantService } from '../services/restaurantService';
import { RestaurantRepository } from '../repositories/restaurantRepository';
import { IRestaurantService } from '../interfaces/IRestaurantService';
import { IRestaurantRepository } from '../interfaces/IRestaurantRepository';

// Registrar PrismaClient si no está ya registrado
const prisma = new PrismaClient();
container.register<PrismaClient>('PrismaClient', { useValue: prisma });

// Registrar RestaurantService y RestaurantRepository
container.registerSingleton<IRestaurantService>('RestaurantService', RestaurantService);
container.registerSingleton<IRestaurantRepository>('RestaurantRepository', RestaurantRepository);
