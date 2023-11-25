'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import api from '@/lib/data';
import { verifyToken } from '@/lib/jwt';
import { statusCodes } from '@/utils';
import type { SessionType, StatusMessageType, UserType } from '@/types';

export async function login(formData: FormData, path: string) {
  const body = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { status, data } = await api.login({ body });

  if (status !== statusCodes.OK) {
    return { message: (data as StatusMessageType).message };
  }

  const user = verifyToken((data as SessionType).token);
  const oneHour = 60 * 60 * 1000;

  cookies().set('session', JSON.stringify(user), {
    expires: Date.now() + oneHour,
  });

  return redirect(path === '/login' ? '/' : path);
}

export async function getSession(): Promise<null | UserType> {
  const session = cookies().get('session')?.value;

  if (!session) {
    return null;
  }

  return JSON.parse(session) as UserType;
}

export async function logout() {
  cookies().delete('session');
  redirect('/login');
}

export async function register(formData: FormData) {
  const body = {
    email: formData.get('email') as string,
    name: formData.get('name') as string,
    password: formData.get('password') as string,
  };

  const { status, data } = await api.createUser({ body });

  if (status !== statusCodes.CREATED) {
    return { message: (data as StatusMessageType).message };
  }

  return redirect('/login');
}
