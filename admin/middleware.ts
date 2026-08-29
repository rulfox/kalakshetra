import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_COOKIE } from './lib/auth';

/**
 * Fast, cookie-presence-only gate (no JWT validation here — that's the backend's job on every
 * request via backendFetch's 401-refresh-redirect flow). This just avoids rendering a dashboard
 * shell for a visitor with no session at all, and keeps an already-logged-in admin off /login.
 */
export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has(ACCESS_COOKIE);
  const { pathname } = request.nextUrl;

  // API routes gate themselves (login/logout need no session at all; presign relies on
  // backendFetch's own cookie check) — redirecting them here would make /api/auth/login
  // itself unreachable before a session exists.
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  if (!hasSession && pathname !== '/login') {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  if (hasSession && pathname === '/login') {
    const url = request.nextUrl.clone();
    url.pathname = '/categories';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
