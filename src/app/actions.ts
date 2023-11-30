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
  User,
} from '@/lib/definitions';

// Makes a registration request and redirects to the login page
export async function register(formData: FormData): Promise<StatusMessage | never> {
  const payload: CreateUserPayload = {
    body: {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      password: formData.get('password') as string,
    },
  };

  const { status, data } = await api.createUser(payload);

  if (status !== statusCodes.CREATED) {
    return data as StatusMessage;
  }

  return redirect('/login');
}

export async function login(
  formData: FormData,
  path: string
): Promise<StatusMessage | never> {
  // Makes a login request
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

  // Creates a session with user data using cookies
  const token = (data as Session).token;

  const session: Session = {
    token,
    user: verifyToken(token),
  };

  const oneHour = 60 * 60 * 1000;

  cookies().set('session', JSON.stringify(session), {
    expires: Date.now() + oneHour,
  });

  // If the previous path is ‘login’ then redirect to the main page otherwise
  // redirect to that path.
  return redirect(path === '/login' ? '/' : path);
}

// Checks session cookies and returns
export async function getSession(): Promise<Session | null> {
  const session = cookies().get('session')?.value;

  if (!session) {
    return null;
  }

  return JSON.parse(session);
}

// Deletes session cookies and redirects to the login page
export async function logout(): Promise<never> {
  cookies().delete('session');

  return redirect('/login');
}

// Revalidates a path or tag or both
export async function revalidate({ path, tag }: RevalidateParams): Promise<void> {
  path && revalidatePath(path);
  tag && revalidateTag(tag);
}
