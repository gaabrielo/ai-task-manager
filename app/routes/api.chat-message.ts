import type { Route } from '.react-router/types/app/routes/+types/api.chat-message';
import prisma from 'prisma/prisma';
import { redirect } from 'react-router';

// Delete message action
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  console.log('Details form =>', formData);

  const messageId = formData.get('messageId') as string;
  const chatId = formData.get('chatId') as string;

  if (chatId && messageId && request.method === 'DELETE') {
    try {
      const res = await prisma.chatMessage.delete({
        where: { id: messageId },
      });

      return { success: !!res.id };
    } catch (error) {
      console.error('Error deleting message:', error);
      return { error: 'Failed to delete message' };
    }
  }

  return null;
}
