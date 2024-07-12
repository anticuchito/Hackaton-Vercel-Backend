import { container } from 'tsyringe';
import { OpenAIService } from '../services/OpenAIService';
import { OpenAIRepository } from '../repositories/OpenAIRepository';
import { IOpenAIService } from '../interfaces/IOpenAIService';
import { IOpenAIRepository } from '../interfaces/IOpenAIRepository';

container.registerSingleton<IOpenAIService>('OpenAIService', OpenAIService);
container.registerSingleton<IOpenAIRepository>('OpenAIRepository', OpenAIRepository);
