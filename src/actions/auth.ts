'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { Profile } from '@/utils/definitions';
import { createClient } from '@/utils/supabase/server';

const baseUrl = process.env.VERCEL_URL ?? '';

export async function fetchUserProfile(): Promise<Profile | null> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  return data as Profile;
}

export async function fetchAnonId(): Promise<string | null> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.is_anonymous) {
    return null;
  }

  return user.id;
}

export async function updateAnonConversations(anonId: string | null): Promise<void> {
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

export async function signIn(
  formData: FormData,
  path: string
): Promise<{ message: string } | void> {
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

export async function signInAnonymously(): Promise<{ message: string } | void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signInAnonymously();

  if (error) {
    return { message: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signInWithGoogle(
  path: string
): Promise<{ message: string } | void> {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${baseUrl}/auth/callback?next=${path === '/login' ? '/' : path}`,
    },
  });

  if (error) {
    return { message: error.message };
  }

  redirect(data.url);
}

export async function signOut(): Promise<{ message: string } | void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { message: error.message };
  }

  redirect('/login');
}

export async function signUp(formData: FormData): Promise<{ message: string } | void> {
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
