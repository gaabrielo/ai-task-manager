import type { Route } from '.react-router/types/app/routes/+types/api.chat';
import prisma from 'prisma/prisma';
import { redirect } from 'react-router';
import type { ChatMessage } from '~/generated/prisma';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const userMessage = formData.get('message');
  const chatId = formData.get('chatId') as string;

  const currentDate = new Date();

  let chatMessage: ChatMessage = {
    id: Date.now().toFixed().toString(),
    content: userMessage?.toString() ?? '',
    role: 'user' as ChatMessage['role'],
    created_at: currentDate,
    updated_at: currentDate,
    chat_id: chatId ?? null,
  };
  let chat;

  console.log('CHAT MESSAGE => ', chatMessage);

  if (chatId) {
    // const chatHistory = await prisma.chatMessage.findMany({ where: { chat_id: chatId } });

    await prisma.chatMessage.create({
      data: chatMessage,
    });
  } else {
    chat = await prisma.chat.create({
      data: {
        created_at: currentDate,
        updated_at: currentDate,
        title: 'TESTE',
      },
    });

    // chatMessage.content =
    //   "Hello! I'm your AI task-management assistant. Share as many details as you can, and I'll provide a clear, step-by-step plan to complete your task.";
    // chatMessage.role = 'assistant' as ChatMessage['role'];
    chatMessage.chat_id = chat.id;

    await prisma.chatMessage.create({
      data: chatMessage,
    });
  }

  return redirect(`/task/new?chat=${chat?.id}`);
}
