import 'reflect-metadata';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { CityRepository } from '../repositories/CityRepository';
import { CityService } from '../services/CityService';
import { ICityRepository } from '../interfaces/ICityRepository';
import { ICityService } from '../interfaces/ICityService';
import { OpenAIService } from '../../../modules/openai/services/OpenAIService';
import { IOpenAIService } from '../../../modules/openai/interfaces/IOpenAIService';

// Register PrismaClient
container.register<PrismaClient>('PrismaClient', {
  useValue: new PrismaClient(),
});

// Register City repository and service
container.register<ICityRepository>('CityRepository', {
  useClass: CityRepository,
});

container.register<ICityService>('CityService', {
  useClass: CityService,
});

// Register OpenAIService
container.register<IOpenAIService>('OpenAIService', {
  useClass: OpenAIService,
});
