import type { Route } from '.react-router/types/app/routes/+types/task-new';
import prisma from 'prisma/prisma';
import { redirect } from 'react-router';
import TasksChatbot from '~/features/tasks/tasks-chatbot';
import type { ChatMessage } from '~/generated/prisma';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const chatId = url.searchParams.get('chat');

  let messages: ChatMessage[] = [];

  if (chatId) {
    const chatMessages = await prisma.chatMessage.findMany({
      where: { chat_id: chatId },
    });

    console.log('MESSAGES =>', chatMessages);

    if (!chatMessages || chatMessages.length === 0) {
      return redirect('/task/new');
    }

    messages = chatMessages || [];
  }

  return { chatId, messages };
}

export default function TaskNew() {
  return <TasksChatbot />;
}
