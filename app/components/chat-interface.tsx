import React, { useEffect, useRef, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Card, CardContent, CardFooter } from '~/components/ui/card';
import { ScrollArea } from '~/components/ui/scroll-area';
import { CircleCheckIcon, CopyIcon, Send, TrashIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import type { ChatMessage } from '~/features/tasks/types';
import { useFetcher, useLoaderData, useSubmit } from 'react-router';
import type { loader } from '~/routes/task-new';
import { IconDots } from '@tabler/icons-react';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from '~/components/ui/dropdown-menu';
import { cn } from '~/lib/utils';
import { toast } from 'sonner';

const defaultMessage: ChatMessage = {
  id: 'default',
  content:
    "Hello! I'm your AI task-management assistant. Share as many details as you can, and I'll provide a clear, step-by-step plan to complete your task.",
  role: 'bot',
  timestamp: new Date(),
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { chatId, messages: messagesHistory } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== 'idle';

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearMessageField = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    scrollToBottom();
    clearMessageField();
  }, [messages]);

  useEffect(() => {
    const updatedMessages = [defaultMessage, ...messagesHistory];
    setMessages(updatedMessages);
  }, [messagesHistory]);

  return (
    <Card className="h-full w-full flex flex-col gap-0 p-0 shadow-none overflow-clip relative overflow-y-auto">
      <CardContent className="flex-1 p-0 pt-0 overflow-y-auto">
        <ScrollArea className="h-full px-4">
          <div className="space-y-4 my-4">
            {messages.map((message, msgIndex) => (
              <div
                key={message.id}
                className={`flex group gap-2 transition-all ${
                  message.role === 'user'
                    ? 'justify-items-end flex-row-reverse'
                    : 'justify-start'
                }`}
                ref={msgIndex === messages.length - 1 ? messagesEndRef : null}
              >
                {message.role === 'bot' && (
                  <Avatar>
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
                    {formatTime(new Date(message.timestamp))}
                  </p>
                </div>
                {chatId && (
                  <MessageDetailsMenu message={message} chatId={chatId} />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="border-t bg-gray-50 rounded-b-lg pb-6">
        <fetcher.Form
          action="/api/chat"
          method="POST"
          className="flex w-full gap-2"
        >
          <input type="hidden" name="chatId" value={chatId ?? ''} />
          <Input
            ref={inputRef}
            name="message"
            placeholder="Type your message here..."
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </fetcher.Form>
      </CardFooter>
    </Card>
  );
}

const MessageDetailsMenu = ({
  message,
  chatId,
}: {
  message: ChatMessage;
  chatId: string;
}) => {
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.success) {
      toast.success('Message deleted successfully');
    } else if (fetcher.data?.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.data]);

  function handleDelete() {
    fetcher.submit(
      { messageId: message.id, chatId },
      { method: 'DELETE', action: '/api/chat-message' }
    );
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(message.content);
    toast('Copied to clipboard', {
      icon: <CircleCheckIcon className="w-4 h-4" />,
    });
  }

  return (
    <DropdownMenu onOpenChange={(isOpen) => setIsButtonOpen(isOpen)}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            'opacity-0 group-hover:opacity-100 transition-all flex h-6 w-6',
            isButtonOpen && 'opacity-100'
          )}
        >
          <IconDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align={message.role === 'user' ? 'end' : 'start'}
      >
        {/* <form onSubmit={handleDelete}> */}
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleCopy}>
            <CopyIcon /> Copy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            <TrashIcon />
            Exclude
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {/* </form> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
