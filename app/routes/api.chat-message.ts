import type { Route } from '.react-router/types/app/routes/+types/api.chat-message';
import prisma from 'prisma/prisma';
import { redirect } from 'react-router';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  console.log('Details form =>', formData);

  const messageId = formData.get('messageId') as string;
  const chatId = formData.get('chatId') as string;

  if (chatId && messageId && request.method === 'DELETE') {
    try {
      const chat = await prisma.chat.findUnique({
        where: { id: chatId },
      });

      if (!chat) {
        return { error: 'Chat not found' };
      }

      // Parse the JSON string to get the messages array
      const messages = JSON.parse(chat.content);

      // Find the message index by ID
      const messageIndex = messages.findIndex(
        (msg: any) => msg.id === messageId
      );

      if (messageIndex === -1) {
        return { error: 'Message not found' };
      }

      // Remove the message from the array
      messages.splice(messageIndex, 1);

      // Update the database with the new messages array
      await prisma.chat.update({
        where: { id: chatId },
        data: { content: JSON.stringify(messages) },
      });

      return { success: true };
    } catch (error) {
      console.error('Error deleting message:', error);
      return { error: 'Failed to delete message' };
    }
  }

  return null;
}
