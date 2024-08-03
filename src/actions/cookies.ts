'use server';

import { cookies } from 'next/headers';

export async function getCookie(name: string) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name)?.value;

  return cookie;
}

export async function setCookie(name: string, value: string) {
  const cookieStore = cookies();
  cookieStore.set({ name, value });
}

export async function removeCookie(name: string) {
  const cookieStore = cookies();
  cookieStore.delete({ name });
}
