import type React from 'react';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        "Hello! I'm a simple chatbot. I'll respond with the same message no matter what you say! I know, I'm kinda useless, but I'm here to help you with your questions. Or maybe I'll just be a bit of a dick and make fun of you. It's up to you. So, what do you want to talk about? You fucking stupid little bitch. I love you.",
      role: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const defaultBotResponse = ` ⣿⣿⣿⣿⡷⠀⢠⣄⡿⢣⣄⡸⢀⣤⣶⣾⣿⣿⣿⣿⣿⣿⣷⣶⣭⡳⣶⣦⣤⣤ ⣿⡿⣿⣿⠃⠀⠿⢟⣲⣿⢏⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡈⢿⣿ ⣿⣿⣶⡆⢀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡹ ⣿⣿⢿⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢷ ⢟⣽⣿⣿⣿⣿⣿⣿⣿⣿⡜⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⣿⣿⣿⣿⣿⡎ ⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠘⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⣡⣾⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢈⣛⠻⣿⣿⠿⢛⣩⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⢻⣿⣷⣄⠰⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⡿⠿⠿⠛⠿⠿⠟⠁⠀⢸⣧⠹⣿⣧⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣷⣶⣿⣿⣷⣶⣶⣶⣶⡌⠻⣧⡘⢿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣈⠁⣀⡀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    // Add bot response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: defaultBotResponse,
      role: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    // from-blue-50 to-indigo-500
    <Card className="h-full w-full flex flex-col gap-0 p-0 shadow-none overflow-clip relative overflow-y-auto">
      {/* <CardHeader className="rounded-t-lg border-b">
        <CardTitle className="text-xl font-bold">Chat assistant</CardTitle>
      </CardHeader> */}

      <CardContent className="flex-1 p-0 pt-0 overflow-y-auto">
        <ScrollArea className="h-full px-4">
          <div className="space-y-4 my-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'bot' && (
                  <Avatar className="mr-2">
                    <AvatarFallback className="text-sm">Ai</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.role === 'user'
                        ? 'text-blue-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="border-t bg-gray-50 rounded-b-lg pb-6">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
