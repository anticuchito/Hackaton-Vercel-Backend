import { CoreMessage, CoreUserMessage, CoreAssistantMessage } from 'ai';

export function convertToCoreMessages(messages: { role: string, content: string }[]): CoreMessage[] {
  return messages.map((msg): CoreMessage => {
    if (msg.role === 'user') {
      return {
        role: 'user',
        content: [{ type: 'text', text: msg.content }],
      } as CoreUserMessage;
    } else if (msg.role === 'assistant') {
      return {
        role: 'assistant',
        content: [{ type: 'text', text: msg.content }],
      } as CoreAssistantMessage;
    } else {
      throw new Error(`Unsupported message role: ${msg.role}`);
    }
  });
}
