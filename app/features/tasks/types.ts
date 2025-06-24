export type ChatMessage = {
  id: string;
  content: string;
  role: 'user' | 'bot';
  timestamp: Date;
};
