import { type NextRequest, NextResponse } from 'next/server';

import { fetchUserProfile } from '@/actions/auth';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const userProfile = await fetchUserProfile();

  if (request.nextUrl.pathname === '/') {
    if (!userProfile) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/suporte')) {
    if (!userProfile) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }

    if (userProfile.role === 'user') {
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
