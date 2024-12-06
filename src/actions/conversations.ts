'use server';

import type { Conversation, ConversationStatus } from '@/utils/definitions';
import { createClient } from '@/utils/supabase/server';

export async function deleteConversation(id: string) {
  const supabase = createClient();
  const response = await supabase.from('conversations').delete().eq('id', id);

  return response;
}

export async function fetchConversationById(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .rpc('fetch_conversation_by_id', {
      id,
    })
    .single();

  if (error) {
    console.log(error);
  }

  return data as Conversation | null;
}

export async function fetchConversationBySupportId(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .rpc('fetch_conversation_by_support_id', {
      id,
    })
    .single();

  if (error) {
    console.log(error);
  }

  return data as Conversation | null;
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
