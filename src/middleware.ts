import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const session = request.cookies.get('session')?.value;

    if (!session) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/suporte')) {
    const session = request.cookies.get('session')?.value;

    if (!session) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }

    const user = JSON.parse(session);

    if (user.role !== 'admin' && user.role !== 'support') {
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }
  }
}
