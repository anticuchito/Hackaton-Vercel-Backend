import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IOpenAIService } from '../interfaces/IOpenAIService';

@injectable()
export class OpenAIController {
  constructor(
    @inject('OpenAIService') private openAIService: IOpenAIService
  ) {}

  async generateText(req: Request, res: Response): Promise<Response> {
    const { prompt } = req.body;
    const result = await this.openAIService.generateText(prompt);
    return res.json(result);
  }
}
