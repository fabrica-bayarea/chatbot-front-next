import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { fetchUserProfile } from '@/actions/auth';
import { fetchConversationBySupportId } from '@/actions/conversations';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await fetchUserProfile();

  if (pathname === '/') {
    if (user) {
      return NextResponse.rewrite(new URL(`/novo/${uuidv4()}`, request.url));
    }
  }

  if (pathname.startsWith('/chat') || pathname.startsWith('/novo')) {
    if (!user) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }
  }

  if (pathname.startsWith('/suporte/atendimentos')) {
    if (!user) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }

    if (user.role === 'user') {
      return NextResponse.rewrite(new URL('/401', request.url));
    }
  }

  if (pathname.startsWith('/suporte/avaliacao/')) {
    if (!user) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }

    const slugs = pathname.split('/').filter(Boolean);
    const conversation = await fetchConversationBySupportId(slugs[2]);

    if (user.id !== conversation?.owner_id) {
      return NextResponse.rewrite(new URL('/401', request.url));
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
