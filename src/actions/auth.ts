'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function fetchUserProfile() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  return data;
}

export async function fetchAnonId() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.is_anonymous) {
    return user.id;
  }

  return null;
}

export async function updateAnonConversations(anonId: string | null) {
  if (anonId) {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from('conversations')
        .update({ owner_id: user.id })
        .eq('owner_id', anonId);

      await supabase
        .from('human_messages')
        .update({ owner_id: user.id })
        .eq('owner_id', anonId);
    }
  }
}

export async function signIn(formData: FormData, path: string) {
  const supabase = createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const anonId = await fetchAnonId();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.name === 'AuthApiError') {
      return { message: 'Credenciais inválidas.' };
    }

    return { message: error.message };
  }

  await updateAnonConversations(anonId);
  revalidatePath('/', 'layout');
  redirect(path === '/login' ? '/' : path);
}

export async function signInAnonymously() {
  const supabase = createClient();
  const { error } = await supabase.auth.signInAnonymously();

  if (error) {
    return { message: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signInWithGoogle(path: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `http://localhost:3000/auth/callback?next=${
        path === '/login' ? '/' : path
      }`,
    },
  });

  if (error) {
    return { message: error.message };
  }

  redirect(data.url);
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { message: error.message };
  }

  redirect('/login');
}

export async function signUp(formData: FormData) {
  const supabase = createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  const picture = formData.get('picture');
  const anonId = await fetchAnonId();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, picture } },
  });

  if (error) {
    if (error.name === 'AuthApiError') {
      return { message: 'E-mail já cadastrado.' };
    }

    return { message: error.message };
  }

  await updateAnonConversations(anonId);
  revalidatePath('/', 'layout');
  redirect('/');
}
