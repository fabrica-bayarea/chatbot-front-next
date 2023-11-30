import type { NextRequest } from 'next/server';
import OpenAI from 'openai';

import type { ConversationMessage } from '@/lib/definitions';

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  const body: { messages: ConversationMessage[] } = await req.json();

  // Simple instruction for AI
  const instruction = {
    role: 'system',
    content:
      'Você é Eda, uma assistente virtual altamente experiente que mantém suas repostas curtas.',
  };

  // Reduces the object to pass only the relevant information
  const reducedMessages = body.messages.reduce(
    (acc, { content, role }) => [...acc, { content, role }],
    [instruction]
  );

  // Request for OpenAI API completions
  const params = {
    messages: reducedMessages,
    model: 'gpt-3.5-turbo',
  } as OpenAI.Chat.ChatCompletionCreateParamsNonStreaming;

  const chatCompletion = await openai.chat.completions.create(params);
  const { message } = chatCompletion.choices[0];

  return Response.json({ message });
}
