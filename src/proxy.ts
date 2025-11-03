import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';

const protectedRoutes = ['/admin'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

  // Get session from cookie
  const cookie = req.cookies.get('session')?.value;
  const session = cookie ? await decrypt(cookie) : null;

  // If accessing a protected route without a session, redirect to /login
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If accessing /login with a session, redirect to /admin
  if (path === '/login' && session) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
