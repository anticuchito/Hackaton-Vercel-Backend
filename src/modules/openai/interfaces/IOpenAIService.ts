export interface IOpenAIService {
  generateText(prompt: string): Promise<string>;
  getGeneratedTexts(): Promise<{ prompt: string, result: string }[]>;
  getGeneratedTextById(id: string): Promise<{ prompt: string, result: string } | null>;
}
