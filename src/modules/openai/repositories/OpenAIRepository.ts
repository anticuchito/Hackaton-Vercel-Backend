import { injectable } from 'tsyringe';
import { createOpenAI } from '@ai-sdk/openai';
import {  CoreMessage, streamText, generateText} from 'ai';
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

  async *streamChatResponse(messages: CoreMessage[]): AsyncGenerator<string, void, unknown> {
    const result = await streamText({
      model: this.model,
      system: 'You are a helpful assistant.',
      messages: messages,
    });
  
    const reader = result.textStream.getReader();
    let buffer = '';
    let firstChunk = true;
  
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
  
      buffer += value;
  
      // Process buffer to ensure chunks are well formed
      if (/\s$/.test(buffer)) {
        const cleanedChunk = (firstChunk ? ' ' : ' ') + buffer.trimEnd();
        firstChunk = false;
        // console.log('Chunk to send:', cleanedChunk);
        yield cleanedChunk;
        buffer = '';
      }
    }
  
    // Send remaining buffer
    if (buffer.length > 0) {
      const cleanedChunk = (firstChunk ? ' ' : ' ') + buffer.trimEnd();
      // console.log('Final chunk to send:', cleanedChunk);
      yield cleanedChunk;
    }
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
