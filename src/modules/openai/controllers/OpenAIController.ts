import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { IOpenAIService } from '../interfaces/IOpenAIService';
import { ValidationError } from '../../../shared/middlewares/errorMiddleware';
import { CoreMessage } from 'ai';

@injectable()
export class OpenAIController {
  constructor(
    @inject('OpenAIService') private openAIService: IOpenAIService
  ) {}

  async generateText(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        throw new ValidationError('Prompt is required');
      }

      const result = await this.openAIService.generateText(prompt);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async streamChatResponse(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { messages } = req.body;
      if (!Array.isArray(messages)) {
        throw new ValidationError('Messages array is required');
      }

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const stream = await this.openAIService.streamChatResponse(messages as CoreMessage[]);
      for await (const chunk of stream) {
        res.write(`data: ${chunk}\n\n`);
      }
      res.end();
    } catch (error) {
      next(error);
    }
  }

  async getGeneratedTexts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const texts = await this.openAIService.getGeneratedTexts();
      res.json(texts);
    } catch (error) {
      next(error);
    }
  }

  async getGeneratedTextById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const text = await this.openAIService.getGeneratedTextById(id);
      if (text) {
        res.json(text);
      } else {
        res.status(404).json({ message: 'Generated text not found' });
      }
    } catch (error) {
      next(error);
    }
  }
}
