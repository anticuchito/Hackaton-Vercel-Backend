// container.ts
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { AuthService } from '../services/AuthService';
import { UserRepository } from '../repositories/UserRepository';
import { RevokedTokenRepository } from '../repositories/RevokedTokenRepository';
import { IAuthService } from '../interfaces/IAuthService';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IRevokedTokenRepository } from '../interfaces/IRevokedTokenRepository';

// Registrar PrismaClient
const prisma = new PrismaClient();
container.register<PrismaClient>('PrismaClient', { useValue: prisma });

// Registrar AuthService, UserRepository y RevokedTokenRepository
container.registerSingleton<IAuthService>('AuthService', AuthService);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IRevokedTokenRepository>('RevokedTokenRepository', RevokedTokenRepository);