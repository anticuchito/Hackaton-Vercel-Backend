export type CoreMessage = {
    role: 'system' | 'user' | 'assistant' | 'tool';
    content: string;
  };
  