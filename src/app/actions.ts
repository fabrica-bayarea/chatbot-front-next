'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import api from '@/lib/data';
import { verifyToken } from '@/lib/jwt';
import statusCodes from '@/lib/statusCodes';

import {
  CreateUserPayload,
  LoginPayload,
  RevalidateParams,
  Session,
  StatusMessage,
} from '@/lib/definitions';

// Creates a session with user data using cookies
export async function createSession(token: string): Promise<void> {
  const session: Session = {
    token,
    user: verifyToken(token),
  };

  const ONE_HOUR = 60 * 60 * 1000;

  console.log(session);

  cookies().set('session', JSON.stringify(session), {
    expires: Date.now() + ONE_HOUR,
  });
}

// Check cookies and return the session
export async function getSession(): Promise<Session | null> {
  const session = cookies().get('session')?.value;

  if (!session) {
    return null;
  }

  return JSON.parse(session);
}

export async function login(
  formData: FormData,
  path: string
): Promise<StatusMessage | never> {
  // Make a login request
  const payload: LoginPayload = {
    body: {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    },
  };

  const { status, data } = await api.login(payload);

  if (status !== statusCodes.OK) {
    return data as StatusMessage;
  }

  const token = (data as Session).token;

  createSession(token);

  // If the previous path is 'login', redirect to the main page.
  // Otherwise, redirect to that path.
  return redirect(path === '/login' ? '/' : path);
}

// Deletes session cookies and redirects to login page
export async function logout(): Promise<never> {
  cookies().delete('session');

  return redirect('/login');
}

// Makes a registration request and redirects to the login page
export async function register(formData: FormData): Promise<StatusMessage | never> {
  const payload: CreateUserPayload = {
    body: {
      email: formData.get('email') as string,
      imageUrl: formData.get('avatar') as string,
      name: formData.get('name') as string,
      password: formData.get('password') as string,
    },
  };

  const { status, data } = await api.createUser(payload);

  if (status !== statusCodes.CREATED) {
    return data as StatusMessage;
  }

  const token = (data as Session).token;
  createSession(token);

  return redirect('/');
}

// Revalidates a path, tag, or both
export async function revalidate({ path, tag }: RevalidateParams): Promise<void> {
  path && revalidatePath(path);
  tag && revalidateTag(tag);
}
