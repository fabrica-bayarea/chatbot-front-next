'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
    options: { data: { name, picture, role: 'user' } },
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

export async function getProfile() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    const id = data.user.id;

    const profile = await supabase.from('profiles').select('*').eq('id', id);

    return profile.data[0];
  }

  return undefined;
}

export async function createConversation(userId) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('conversations')
    .insert([{ user_id: userId }])
    .select();

  return data[0].id;
}

export async function createHumanMessage(
  conversationId,
  userId,
  { role, content, time }
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('human_messages')
    .insert([{ role, content, time, conversation_id: conversationId, user_id: userId }])
    .select();

  return data;
}

export async function createAIMessage(conversationId, { content, time }) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('ai_messages')
    .insert([{ content, time, conversation_id: conversationId }])
    .select();

  return data;
}

export async function updateAIConversation(conversationId, newMessages) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const id = conversationId ? conversationId : await createConversation(user?.id);
  const humanMessage = newMessages[0];
  const aiMessage = newMessages[1];
  createHumanMessage(id, user?.id, humanMessage);
  createAIMessage(id, aiMessage);

  return id;
}

export async function fetchHistory() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('conversations')
    .select(
      `
      *,
      human_messages (*),
      ai_messages (*)
    `
    )
    .eq('user_id', user?.id);

  const history = data?.map((c) => {
    const aiMessages = c.ai_messages.map((m) => ({ ...m, role: 'assistant' }));
    const messages = [...c.human_messages, ...aiMessages];
    const sortedMessages = messages.sort((a, b) => a.time - b.time);

    return {
      id: c.id,
      status: c.status,
      created_at: c.created_at,
      messages: sortedMessages,
    };
  });

  return history;
}
