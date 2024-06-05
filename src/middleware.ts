import { type NextRequest, NextResponse } from 'next/server';

import { updateSession } from '@/utils/supabase/middleware';
import { createClient } from '@/utils/supabase/server';

export async function middleware(request: NextRequest) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (request.nextUrl.pathname === '/') {
    if (!data.user) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/suporte')) {
    if (!data.user) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }

    const { role } = data.user.user_metadata;

    if (role !== 'admin' && role !== 'collaborator') {
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
