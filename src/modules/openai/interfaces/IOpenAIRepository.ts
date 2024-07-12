export interface IOpenAIRepository {
    generateText(prompt: string): Promise<string>;
  }
  