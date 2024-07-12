import { injectable } from 'tsyringe';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { IOpenAIRepository } from '../interfaces/IOpenAIRepository';

@injectable()
export class OpenAIRepository implements IOpenAIRepository {
  private model: any;

  constructor() {
    this.model = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      compatibility: 'strict',
    })('gpt-3.5-turbo');
  }

  async generateText(prompt: string): Promise<string> {
    const response = await generateText({
      model: this.model,
      prompt: prompt,
    });
    return response.text;
  }
}
