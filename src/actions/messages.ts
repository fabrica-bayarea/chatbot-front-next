'use server';

import { Message, MessageFeedback } from '@/utils/definitions';
import { createClient } from '@/utils/supabase/server';

export async function createAIMessage({
  id,
  conversation_id,
  content,
  created_at,
}: Message) {
  const supabase = createClient();

  const response = await supabase
    .from('ai_messages')
    .insert([{ id, conversation_id, content, created_at }])
    .select()
    .single();

  return response;
}

export async function createHumanMessage({
  id,
  conversation_id,
  content,
  created_at,
  role,
}: Message) {
  const supabase = createClient();

  const response = await supabase
    .from('human_messages')
    .insert([{ id, conversation_id, content, created_at, role }])
    .select()
    .single();

  return response;
}

export async function updateMessageFeedback(id: string, feedback: MessageFeedback) {
  const supabase = createClient();

  const response = await supabase
    .from('ai_messages')
    .update({ feedback })
    .eq('id', id)
    .select();

  return response;
}
