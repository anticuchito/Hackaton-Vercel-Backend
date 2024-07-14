import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';
import { IUserService } from '../interfaces/IUserService';
import { IUserRepository } from '../interfaces/IUserRepository';
// Registrar PrismaClient
const prisma = new PrismaClient();
container.register<PrismaClient>('PrismaClient', { useValue: prisma });

// Registrar UserService y UserRepository
container.registerSingleton<IUserService>('UserService', UserService);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);