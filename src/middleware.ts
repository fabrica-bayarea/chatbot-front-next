import { type NextRequest, NextResponse } from 'next/server';

import { fetchProfile } from '@/app/actions';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const data = await fetchProfile();

  if (request.nextUrl.pathname === '/') {
    if (!data) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/suporte')) {
    if (!data) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }

    if (data.role !== 'admin' && data.role !== 'collaborator') {
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
