import type { NextRequest } from 'next/server';
import OpenAI from 'openai';

import type { ChatMessageType } from '@/types';

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  const body: { messages: ChatMessageType[] } = await req.json();
  const { messages } = body;

  const instruction = {
    role: 'system',
    content:
      'Você é Eda, uma assistente virtual altamente experiente que mantém suas repostas curtas.',
  };

  const reducedMessages = messages.reduce(
    (acc, { role, content }) => [...acc, { role, content }],
    [instruction]
  );

  const params = {
    messages: reducedMessages,
    model: 'gpt-3.5-turbo',
  } as OpenAI.Chat.ChatCompletionCreateParamsNonStreaming;

  const chatCompletion = await openai.chat.completions.create(params);
  const { message } = chatCompletion.choices[0];

  return Response.json({ message });
}
