import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/chat')) {
    if (!session) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/suporte')) {
    if (!session) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }

    const { user } = JSON.parse(session);

    if (user.role !== 'admin' && user.role !== 'collaborator') {
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }
  }
}
