import { injectable, inject } from 'tsyringe';
import { IOpenAIService } from '../interfaces/IOpenAIService';
import { IOpenAIRepository } from '../interfaces/IOpenAIRepository';

@injectable()
export class OpenAIService implements IOpenAIService {
  constructor(
    @inject('OpenAIRepository') private openAIRepository: IOpenAIRepository
  ) {}

  async generateText(prompt: string): Promise<string> {
    return this.openAIRepository.generateText(prompt);
  }

  async getGeneratedTexts(): Promise<{ prompt: string, result: string }[]> {
    return this.openAIRepository.getGeneratedTexts();
  }

  async getGeneratedTextById(id: string): Promise<{ prompt: string, result: string } | null> {
    return this.openAIRepository.getGeneratedTextById(id);
  }
}
