'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import api from '@/lib/data';

import {
  ConversationMessage,
  UpdateFeedbackPayload,
  UpdateStatusPayload,
} from '@/lib/definitions';

import { createClient } from '@/utils/supabase/server';

export async function signIn(formData: FormData, path: string) {
  const supabase = createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.log(error.message);
    return { message: error.message };
  }

  revalidatePath('/', 'layout');
  redirect(path === '/login' ? '/' : path);
}

export async function signInWithGoogle() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  });

  if (error) {
    console.log(error.message);
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function signUp(formData: FormData) {
  const supabase = createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  const picture = formData.get('picture');

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, picture } },
  });

  if (error) {
    console.log(error.message);
    return { message: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error.message);
    redirect('/error');
  }

  redirect('/login');
}

export async function fetchProfile() {
  const supabase = createClient();
  const userResponse = await supabase.auth.getUser();

  const { user } = userResponse.data;

  if (user) {
    const profileResponse = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return profileResponse.data;
  }

  return null;
}

export async function createConversation(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('conversations')
    .insert([{ user_id: userId }])
    .select()
    .single();

  return data.id;
}

export async function createHumanMessage(
  conversationId: string,
  { id, role, content, created_at }: ConversationMessage
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('human_messages')
    .insert([{ id, role, content, created_at, conversation_id: conversationId }])
    .select()
    .single();

  return data;
}

export async function createAIMessage(
  conversationId: string,
  { id, content, created_at }: ConversationMessage
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('ai_messages')
    .insert([{ id, content, created_at, conversation_id: conversationId }])
    .select()
    .single();

  return data;
}

export async function updateAIConversation(
  conversationId: string,
  newMessages: ConversationMessage[]
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const id = conversationId
    ? conversationId
    : await createConversation(user?.id as string);

  const humanMessage = await createHumanMessage(id, newMessages[0]);
  const aiMessage = await createAIMessage(id, newMessages[1]);

  return {
    id,
    messages: [humanMessage, { ...aiMessage, role: 'assistant' }],
  };
}

export async function fetchHistory() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const response = await supabase.rpc('fetch_conversations', {
  //   user_id: user?.id,
  // });

  const response = await supabase
    .from('conversations_view')
    .select()
    .match({ user_id: user?.id });

  return response;
}

export async function deleteConversation(id: string) {
  const supabase = createClient();
  const response = await supabase.from('conversations').delete().eq('id', id);

  return response;
}

export async function updateFeedback({ id, feedback }: UpdateFeedbackPayload) {
  const supabase = createClient();

  const response = await supabase
    .from('ai_messages')
    .update({ feedback })
    .eq('id', id)
    .select();

  return response;
}

export async function updateStatus({ table, id, status }: UpdateStatusPayload) {
  const supabase = createClient();
  const response = await supabase.from(table).update({ status }).eq('id', id).select();

  return response;
}

export async function fetchSupportList() {
  const supabase = createClient();

  const response = await supabase.rpc('fetch_support_list');

  return response;
}

export async function fetchSupportById(supportId: string) {
  const supabase = createClient();

  const response = await supabase.rpc('fetch_support_by_id', {
    support_id: supportId,
  }).single();

  return response;
}

export async function sendSupport(id: string) {
  const supabase = createClient();
  const profile = await fetchProfile();

  const { data: support } = await supabase
    .from('support_view')
    .select()
    .match({ id })
    .single();

  const body = {
    collaboratorName: profile?.name as string,
    email: support.user_profile?.email as string,
    id: support.id as string,
    messages: support?.messages as ConversationMessage[],
    name: support.user_profile?.name as string,
  };

  const { status } = await api.sendEmail({ body });

  if (status === 200) {
    const time = new Date().toISOString();
    await supabase.from('support').update({ last_email: time }).eq('id', id).select();

    return time;
  }
}
