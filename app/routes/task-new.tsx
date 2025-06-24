import type { Route } from '.react-router/types/app/routes/+types/task-new';
import prisma from 'prisma/prisma';
import { redirect } from 'react-router';
import TasksChatbot from '~/features/tasks/tasks-chatbot';
import type { ChatMessage } from '~/features/tasks/types';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const chatId = url.searchParams.get('chat');

  let messages: ChatMessage[] = [];

  if (chatId) {
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
    });

    if (!chat) {
      return redirect('/task/new');
    }

    messages = chat?.content
      ? (JSON.parse(chat?.content) as ChatMessage[])
      : [];
  }

  return { chatId, messages };
}

export default function TaskNew() {
  return <TasksChatbot />;
}
