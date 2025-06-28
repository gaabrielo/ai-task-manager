import OpenAI from 'openai';
import type { ChatMessage } from '~/generated/prisma';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

export async function getChatCompletions(messages: ChatMessage[]) {
  const completion = await openai.chat.completions.create({
    model: 'text-davinci-002',
    // prompt: 'Say this is a test',
    // max_tokens: 6,
    // temperature: 0,
    messages,
  });

  console.log(completion.choices);
  return completion.choices[0].message.content;
}
// main().catch(console.error);
