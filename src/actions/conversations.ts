'use server';

import { ConversationStatus, Message, MessageFeedback } from '@/utils/definitions';
import { createClient } from '@/utils/supabase/server';

export async function deleteConversation(id: string) {
  const supabase = createClient();
  const response = await supabase.from('conversations').delete().eq('id', id);

  return response;
}

export async function fetchHistory() {
  const supabase = createClient();
  const response = await supabase.rpc('fetch_conversations');

  return response;
}

export async function updateConversationStatus(id: string, status: ConversationStatus) {
  const supabase = createClient();

  const response = await supabase
    .from('conversations')
    .update({ status })
    .eq('id', id)
    .select();

  return response;
}
