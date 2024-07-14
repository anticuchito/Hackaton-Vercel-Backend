import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { AuthService } from '../services/AuthService';
import { UserRepository } from '../repositories/UserRepository';
import { IAuthService } from '../interfaces/IAuthService';
import { IUserRepository } from '../interfaces/IUserRepository';

// Registrar PrismaClient
const prisma = new PrismaClient();
container.register<PrismaClient>('PrismaClient', { useValue: prisma });

// Registrar AuthService y UserRepository
container.registerSingleton<IAuthService>('AuthService', AuthService);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
