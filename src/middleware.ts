import { type NextRequest, NextResponse } from 'next/server';

import { fetchUserProfile } from '@/actions/auth';
import { fetchSupportById } from './actions/support';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await fetchUserProfile();

  if (pathname === '/') {
    if (!user) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }
  }

  if (pathname.startsWith('/suporte/atendimentos')) {
    if (!user) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }

    if (user.role === 'user') {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
  }

  if (pathname.startsWith('/suporte/avaliacao/')) {
    if (!user) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }

    const pathId = pathname.split('/').splice(-1)[0];
    const support = await fetchSupportById(pathId);

    if (user.id !== support?.owner_profile.id) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
