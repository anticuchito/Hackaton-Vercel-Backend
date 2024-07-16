import { injectable } from 'tsyringe';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { IOpenAIRepository } from '../interfaces/IOpenAIRepository';
import { PrismaClient } from '@prisma/client';

@injectable()
export class OpenAIRepository implements IOpenAIRepository {
  private model: any;
  private prisma: PrismaClient;

  constructor() {
    this.model = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      compatibility: 'strict',
    })('gpt-3.5-turbo');
    this.prisma = new PrismaClient();
  }

  async generateText(prompt: string): Promise<string> {
    const response = await generateText({
      model: this.model,
      prompt: prompt,
    });
    const result = response.text;

    await this.prisma.generatedText.create({
      data: {
        prompt,
        result,
      },
    });

    return result;
  }

  async getGeneratedTexts(): Promise<{ prompt: string, result: string }[]> {
    return this.prisma.generatedText.findMany({
      select: {
        prompt: true,
        result: true,
      },
    });
  }

  async getGeneratedTextById(id: string): Promise<{ prompt: string, result: string } | null> {
    return this.prisma.generatedText.findUnique({
      where: { id },
      select: {
        prompt: true,
        result: true,
      },
    });
  }
}
