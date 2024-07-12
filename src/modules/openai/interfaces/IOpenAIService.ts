export interface IOpenAIService {
    generateText(prompt: string): Promise<string>;
  }
  