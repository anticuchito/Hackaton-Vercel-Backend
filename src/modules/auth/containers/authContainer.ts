// container.ts
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { AuthService } from '../services/AuthService';
import { AuthRepository } from '../repositories/AuthRepository';
import { RevokedTokenRepository } from '../repositories/RevokedTokenRepository';
import { IAuthService } from '../interfaces/IAuthService';
import { IAuthRepository } from '../interfaces/IAuthRepository';
import { IRevokedTokenRepository } from '../interfaces/IRevokedTokenRepository';

// Registrar PrismaClient
const prisma = new PrismaClient();
container.register<PrismaClient>('PrismaClient', { useValue: prisma });

// Registrar AuthService, UserRepository y RevokedTokenRepository
container.registerSingleton<IAuthService>('AuthService', AuthService);
container.registerSingleton<IAuthRepository>('AuthRepository', AuthRepository);
container.registerSingleton<IRevokedTokenRepository>('RevokedTokenRepository', RevokedTokenRepository);
