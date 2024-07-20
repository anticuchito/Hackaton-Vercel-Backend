import { CoreMessage } from 'ai';

export interface IOpenAIRepository {
  generateText(prompt: string): Promise<string>;
  getGeneratedTexts(): Promise<{ prompt: string, result: string }[]>;
  getGeneratedTextById(id: string): Promise<{ prompt: string, result: string } | null>;
  streamChatResponse(messages: CoreMessage[]): AsyncGenerator<string, void, unknown>;
}
